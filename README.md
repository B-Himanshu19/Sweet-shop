# Sweet Shop Management System

A full-stack web application for managing a sweet shop inventory, built with Node.js/TypeScript (Express) backend and React/TypeScript frontend.

## 🚀 Quick Start - Open in Browser

**View Repository:** [Click here to open the repository](https://github.com/B-Himanshu19/Sweet-shop)

**Open in Browser Editor:** [Click here to edit in GitHub.dev](https://github.dev/B-Himanshu19/Sweet-shop)

**Open in Codespaces:** [Click here to open in GitHub Codespaces](https://codespaces.new/B-Himanshu19/Sweet-shop)

> ✅ **Repository is live!** Click any link above to view or edit the project in your browser.

## 🎯 Project Overview

This is a complete Sweet Shop Management System that allows users to:
- Register and login with JWT authentication
- Browse available sweets
- Search and filter sweets by name, category, and price range
- Purchase sweets (decreases inventory)
- Admin users can add, update, delete, and restock sweets

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: SQLite (easily migratable to PostgreSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest with Supertest
- **Validation**: express-validator

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3 with modern responsive design

## 📋 Features

### Authentication
- User registration with validation
- User login with JWT token
- Protected routes requiring authentication
- Role-based access control (User/Admin)

### Sweets Management
- View all available sweets
- Search sweets by name
- Filter by category and price range
- Purchase sweets (decreases quantity)
- Admin: Create, update, delete sweets
- Admin: Restock sweets (increases quantity)

### User Experience
- Responsive design for mobile and desktop
- Real-time search and filtering
- Intuitive admin panel
- Clear error and success messages
- Purchase button disabled when out of stock

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
DB_PATH=./sweet_shop.db
```

5. Run the development server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Running Tests

#### Backend Tests
```bash
cd backend
npm test
```

To run with coverage:
```bash
npm run test:coverage
```

#### Frontend Tests
```bash
cd frontend
npm test
```

## 📁 Project Structure

```
sweet-shop-management/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Type definitions
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth middleware
│   │   ├── database/        # Database setup
│   │   ├── __tests__/       # Integration tests
│   │   └── server.ts        # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # React context (Auth)
│   │   ├── services/        # API service layer
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Sweets (Protected - Requires Authentication)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/:id` - Get sweet by ID
- `GET /api/sweets/search` - Search sweets (query params: name, category, minPrice, maxPrice)
- `POST /api/sweets/:id/purchase` - Purchase a sweet (decreases quantity)

### Admin Only
- `POST /api/sweets` - Create a new sweet
- `PUT /api/sweets/:id` - Update a sweet
- `DELETE /api/sweets/:id` - Delete a sweet
- `POST /api/sweets/:id/restock` - Restock a sweet (increases quantity)

## 🧪 Testing

The project follows Test-Driven Development (TDD) principles with comprehensive test coverage:

- **Unit Tests**: Service layer tests for business logic
- **Integration Tests**: API endpoint tests with authentication
- **Test Coverage**: Aim for high coverage with meaningful test cases

Run backend tests:
```bash
cd backend && npm test
```

**Test Results:** ✅ All 33 tests passing

## 🎨 Design

The application features a modern, clean, and responsive design:
- Mobile-first approach
- Intuitive navigation
- Clear visual feedback for user actions
- Accessible color schemes and contrast
- Smooth transitions and hover effects

## 📝 My AI Usage

### Which AI Tools Were Used

I used **Claude (via Cursor AI)** extensively throughout the development of this project. Cursor's AI assistant was instrumental in:

1. **Code Generation**: Generating boilerplate code for Express routes, React components, and TypeScript interfaces
2. **Test Writing**: Creating comprehensive test suites for services and API endpoints
3. **Debugging**: Identifying and fixing type errors, import issues, and logic bugs
4. **Code Refactoring**: Improving code structure and following best practices
5. **Documentation**: Assisting in writing clear comments and documentation

### How AI Tools Were Used

1. **Initial Project Setup**: 
   - Used AI to generate the complete project structure, including package.json files, TypeScript configurations, and build scripts
   - Generated database schema and models based on requirements

2. **Backend Development**:
   - Asked AI to generate Express route handlers with proper error handling
   - Used AI to create authentication middleware and JWT token handling
   - Generated service layer code with database operations
   - Created comprehensive test files following TDD principles

3. **Frontend Development**:
   - Used AI to generate React components with TypeScript types
   - Created authentication context and protected route components
   - Generated API service layer with Axios interceptors
   - Built responsive UI components with modern CSS

4. **Problem Solving**:
   - When encountering TypeScript type errors, asked AI to help resolve them
   - Used AI to debug database query issues
   - Asked for suggestions on implementing search and filter functionality

5. **Code Quality**:
   - Used AI to review code for best practices
   - Asked for suggestions on improving error handling
   - Generated validation logic for forms and API endpoints

### Reflection on AI's Impact

**Positive Impacts:**
- **Speed**: Significantly accelerated development by generating boilerplate code and common patterns
- **Learning**: Helped me understand TypeScript patterns, React hooks, and Express best practices
- **Quality**: Ensured consistent code style and helped catch potential bugs early
- **Documentation**: Assisted in writing clear, comprehensive documentation

**Challenges:**
- Sometimes needed to refine AI-generated code to match specific requirements
- Had to verify that generated tests actually test the right things
- Occasionally needed to adjust AI suggestions to fit the project's architecture

**Best Practices Followed:**
- Always reviewed AI-generated code before committing
- Used AI as a pair programming partner, not a replacement for understanding
- Verified all AI suggestions against project requirements
- Maintained clean commit history with clear messages

**Conclusion:**
AI tools were invaluable in this project, especially for generating boilerplate code, writing tests, and debugging. However, I made sure to understand every piece of code and maintain ownership of the final implementation. The AI acted as a powerful assistant that helped me work more efficiently while ensuring code quality.

## 📸 Screenshots

*Note: Screenshots of the application in action should be added here after running the application locally.*

## 🚢 Deployment

### Backend Deployment
The backend can be deployed to platforms like:
- Heroku
- Railway
- Render
- AWS EC2

Make sure to:
- Set environment variables (JWT_SECRET, PORT, DB_PATH)
- Use a production database (PostgreSQL recommended)
- Enable HTTPS

### Frontend Deployment
The frontend can be deployed to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Update the API URL in the frontend environment variables before deploying.

## 🤝 Contributing

This is a TDD Kata project. If you'd like to contribute:
1. Follow TDD principles (write tests first)
2. Maintain code quality and clean architecture
3. Write clear commit messages
4. Add AI co-authorship when using AI tools

## 📄 License

ISC

## 👤 Author

Built as part of a TDD Kata exercise demonstrating full-stack development skills.

---

**Note**: This project was built following Test-Driven Development principles. Check the commit history to see the Red-Green-Refactor pattern in action.
