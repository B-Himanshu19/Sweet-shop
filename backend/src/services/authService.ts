import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { database } from '../database/database';
import { User, UserCreate, UserPublic } from '../models/User';

export class AuthService {
  async register(userData: UserCreate): Promise<UserPublic> {
    const { username, email, password, role = 'user' } = userData;

    // Check if user already exists
    const existingUser = await database.get(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await database.run(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );

    const userId = (result as any).lastID;
    const user = await database.get('SELECT id, username, email, role, created_at FROM users WHERE id = ?', [userId]);

    return user as UserPublic;
  }

  async login(username: string, password: string): Promise<{ token: string; user: UserPublic }> {
    const user = await database.get(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, username]
    ) as User | undefined;

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const jwtSecret = process.env.JWT_SECRET || 'default-secret';
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: '24h' }
    );

    const userPublic: UserPublic = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at
    };

    return { token, user: userPublic };
  }
}

export const authService = new AuthService();

