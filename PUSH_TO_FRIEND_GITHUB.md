# Push Project to Friend's GitHub Repository

## Quick Steps

### Step 1: Your Friend Creates Repository

Your friend needs to:
1. Go to https://github.com/new
2. Repository name: `sweet-shop-management`
3. Make it **PUBLIC** ✅
4. **DO NOT** check "Initialize with README" ❌
5. Click "Create repository"
6. Copy the repository URL (e.g., `https://github.com/FRIEND_USERNAME/sweet-shop-management.git`)

### Step 2: Run Setup Script (Easy Way)

Run this PowerShell script:
```powershell
.\setup-github-remote.ps1
```

It will ask for your friend's GitHub username and set everything up automatically!

### Step 3: Manual Setup (Alternative)

If you prefer to do it manually:

```powershell
# Replace FRIEND_USERNAME with actual username
$friendUsername = "FRIEND_USERNAME"
git remote add origin "https://github.com/$friendUsername/sweet-shop-management.git"
git branch -M main
git push -u origin main
```

### Step 4: Push Code

```powershell
git push -u origin main
```

**Note:** If you get "permission denied", your friend needs to:
- Go to repository → Settings → Collaborators
- Add your GitHub username as a collaborator

### Step 5: Get Browser Links

After pushing, use these links:

**Repository Link:**
```
https://github.com/FRIEND_USERNAME/sweet-shop-management
```

**Open in Browser Editor (GitHub.dev):**
```
https://github.dev/FRIEND_USERNAME/sweet-shop-management
```

**Open in Codespaces (Full VS Code):**
```
https://codespaces.new/FRIEND_USERNAME/sweet-shop-management
```

## Update README with Links

After pushing, update the README.md file:
1. Replace `YOUR_FRIEND_USERNAME` with the actual username
2. Commit and push the update

```powershell
# Edit README.md and replace YOUR_FRIEND_USERNAME
git add README.md
git commit -m "docs: Update README with repository links"
git push
```

## Troubleshooting

### "Repository not found"
- Make sure your friend created the repository
- Check the repository name matches exactly
- Ensure repository is PUBLIC

### "Permission denied"
- Your friend needs to add you as a collaborator
- Or your friend needs to push the code themselves

### "Remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/FRIEND_USERNAME/sweet-shop-management.git
```

## Share the Project

Once set up, share this link with anyone:
```
https://github.com/FRIEND_USERNAME/sweet-shop-management
```

To open and edit directly in browser:
```
https://github.dev/FRIEND_USERNAME/sweet-shop-management
```

