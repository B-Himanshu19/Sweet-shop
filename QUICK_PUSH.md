# Quick Push to Friend's GitHub - Simple Steps

## Method 1: Use the Script (Recommended)

1. **Your friend creates repository:**
   - Go to https://github.com/new
   - Name: `sweet-shop-management`
   - Make it **PUBLIC** ✅
   - **Don't** initialize with README ❌

2. **Run the script:**
   ```powershell
   .\setup-github-remote.ps1
   ```
   - Enter your friend's GitHub username when asked

3. **Push:**
   ```powershell
   git push -u origin main
   ```

## Method 2: Manual (If Script Doesn't Work)

Replace `FRIEND_USERNAME` with actual username:

```powershell
# Step 1: Add remote
git remote add origin https://github.com/FRIEND_USERNAME/sweet-shop-management.git

# Step 2: Rename branch
git branch -M main

# Step 3: Push
git push -u origin main
```

## After Pushing - Get Browser Links

Replace `FRIEND_USERNAME` with actual username:

**View Repository:**
```
https://github.com/FRIEND_USERNAME/sweet-shop-management
```

**Open & Edit in Browser:**
```
https://github.dev/FRIEND_USERNAME/sweet-shop-management
```

**Open in Codespaces:**
```
https://codespaces.new/FRIEND_USERNAME/sweet-shop-management
```

## Troubleshooting

**"Remote already exists":**
```powershell
git remote remove origin
git remote add origin https://github.com/FRIEND_USERNAME/sweet-shop-management.git
```

**"Permission denied":**
- Your friend needs to add you as collaborator
- Or your friend needs to push themselves

**"Repository not found":**
- Make sure repository is created and PUBLIC
- Check the username is correct

