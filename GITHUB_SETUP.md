# GitHub Setup Guide

## Initializing Git Repository

1. **Initialize Git (if not already done):**
   ```bash
   git init
   ```

2. **Add all files:**
   ```bash
   git add .
   ```

3. **Create initial commit:**
   ```bash
   git commit -m "feat: Initial project setup - Sweet Shop Management System

   - Set up backend with Express, TypeScript, and SQLite
   - Implemented authentication with JWT
   - Created all API endpoints for sweets management
   - Built React frontend with TypeScript
   - Added comprehensive test suite
   - Created documentation and setup guides

   Co-authored-by: Claude AI <claude@users.noreply.github.com>"
   ```

## Creating GitHub Repository

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it: `sweet-shop-management`
   - Choose Public visibility
   - Don't initialize with README (we already have one)

2. **Connect local repository to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/sweet-shop-management.git
   git branch -M main
   git push -u origin main
   ```

## Commit Message Examples

When making commits, follow this format:

```bash
git commit -m "feat: Add user registration endpoint

Implemented POST /api/auth/register with validation.
Added tests for registration functionality.

Co-authored-by: Claude AI <claude@users.noreply.github.com>"
```

### Commit Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Adding or updating tests
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `style:` - Code style changes (formatting)
- `chore:` - Build process or auxiliary tool changes

## Adding AI Co-author to Commits

When using AI tools, add this to your commit message:

```
Co-authored-by: AI Tool Name <ai@users.noreply.github.com>
```

Example:
```bash
git commit -m "feat: Implement sweet search functionality

Added search endpoint with filtering by name, category, and price range.

Co-authored-by: Claude AI <claude@users.noreply.github.com>"
```

## Repository Structure on GitHub

Your repository should have:
- ✅ README.md (with AI Usage section)
- ✅ Backend code in `/backend`
- ✅ Frontend code in `/frontend`
- ✅ Test files
- ✅ .gitignore
- ✅ Setup documentation

## Making Repository Public

1. Go to repository Settings
2. Scroll to "Danger Zone"
3. Click "Change visibility"
4. Select "Make public"
5. Confirm

## Adding Screenshots

After running the application:
1. Take screenshots of:
   - Login page
   - Dashboard with sweets
   - Admin panel
   - Search/filter functionality
2. Add them to a `/screenshots` folder
3. Update README.md to include screenshots

## Test Report

To generate test coverage report:

```bash
cd backend
npm run test:coverage
```

The coverage report will be in `backend/coverage/`. You can commit this or add it to README.

