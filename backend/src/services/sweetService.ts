import { database } from '../database/database';
import { Sweet, SweetCreate, SweetUpdate, SweetSearchParams } from '../models/Sweet';

export class SweetService {
  async createSweet(sweetData: SweetCreate): Promise<Sweet> {
    const { name, category, price, quantity = 0 } = sweetData;

    // Check if sweet with same name exists
    const existing = await database.get('SELECT * FROM sweets WHERE name = ?', [name]);
    if (existing) {
      throw new Error('Sweet with this name already exists');
    }

    const result = await database.run(
      'INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)',
      [name, category, price, quantity]
    );

    const sweetId = (result as any).lastID;
    const sweet = await database.get('SELECT * FROM sweets WHERE id = ?', [sweetId]);
    return sweet as Sweet;
  }

  async getAllSweets(): Promise<Sweet[]> {
    return await database.all('SELECT * FROM sweets ORDER BY created_at DESC');
  }

  async getSweetById(id: number): Promise<Sweet | null> {
    const sweet = await database.get('SELECT * FROM sweets WHERE id = ?', [id]);
    return sweet ? (sweet as Sweet) : null;
  }

  async updateSweet(id: number, updates: SweetUpdate): Promise<Sweet> {
    const sweet = await this.getSweetById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    const updatedData = {
      name: updates.name ?? sweet.name,
      category: updates.category ?? sweet.category,
      price: updates.price ?? sweet.price,
      quantity: updates.quantity ?? sweet.quantity,
    };

    // Check if name is being changed and conflicts with existing sweet
    if (updates.name && updates.name !== sweet.name) {
      const existing = await database.get('SELECT * FROM sweets WHERE name = ? AND id != ?', [updates.name, id]);
      if (existing) {
        throw new Error('Sweet with this name already exists');
      }
    }

    await database.run(
      'UPDATE sweets SET name = ?, category = ?, price = ?, quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [updatedData.name, updatedData.category, updatedData.price, updatedData.quantity, id]
    );

    const updatedSweet = await this.getSweetById(id);
    return updatedSweet!;
  }

  async deleteSweet(id: number): Promise<void> {
    const sweet = await this.getSweetById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    await database.run('DELETE FROM sweets WHERE id = ?', [id]);
  }

  async searchSweets(params: SweetSearchParams): Promise<Sweet[]> {
    let query = 'SELECT * FROM sweets WHERE 1=1';
    const queryParams: any[] = [];

    if (params.name) {
      query += ' AND name LIKE ?';
      queryParams.push(`%${params.name}%`);
    }

    if (params.category) {
      query += ' AND category = ?';
      queryParams.push(params.category);
    }

    if (params.minPrice !== undefined) {
      query += ' AND price >= ?';
      queryParams.push(params.minPrice);
    }

    if (params.maxPrice !== undefined) {
      query += ' AND price <= ?';
      queryParams.push(params.maxPrice);
    }

    query += ' ORDER BY created_at DESC';

    return await database.all(query, queryParams);
  }

  async purchaseSweet(id: number, quantity: number = 1): Promise<Sweet> {
    const sweet = await this.getSweetById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    if (sweet.quantity < quantity) {
      throw new Error('Insufficient quantity in stock');
    }

    const newQuantity = sweet.quantity - quantity;
    await database.run(
      'UPDATE sweets SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [newQuantity, id]
    );

    const updatedSweet = await this.getSweetById(id);
    return updatedSweet!;
  }

  async restockSweet(id: number, quantity: number): Promise<Sweet> {
    const sweet = await this.getSweetById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    const newQuantity = sweet.quantity + quantity;
    await database.run(
      'UPDATE sweets SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [newQuantity, id]
    );

    const updatedSweet = await this.getSweetById(id);
    return updatedSweet!;
  }
}

export const sweetService = new SweetService();

