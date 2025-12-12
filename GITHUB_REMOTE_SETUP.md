# Setting Up GitHub Remote for Your Friend's Repository

## Step 1: Get Your Friend's GitHub Repository URL

Your friend needs to:
1. Go to https://github.com/new
2. Create a new repository named `sweet-shop-management`
3. Make it **Public**
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Copy the repository URL (it will look like: `https://github.com/FRIEND_USERNAME/sweet-shop-management.git`)

## Step 2: Add Remote and Push

Once you have the repository URL, run these commands:

```bash
# Add your friend's repository as remote origin
git remote add origin https://github.com/FRIEND_USERNAME/sweet-shop-management.git

# Rename branch to main (if needed)
git branch -M main

# Push all code to your friend's repository
git push -u origin main
```

**Note:** Your friend will need to give you access to push, OR they can add you as a collaborator:
- Go to repository Settings → Collaborators → Add collaborator
- Enter your GitHub username

## Step 3: Create Browser Link

After pushing, you can create a link that opens the project in GitHub Codespaces:

### Option 1: GitHub Codespaces (Full VS Code in Browser)
```
https://github.com/FRIEND_USERNAME/sweet-shop-management
```
Then click the green "Code" button → "Codespaces" → "Create codespace on main"

### Option 2: GitHub.dev (Quick Edit in Browser)
```
https://github.dev/FRIEND_USERNAME/sweet-shop-management
```

### Option 3: Direct Codespaces Link
```
https://codespaces.new/FRIEND_USERNAME/sweet-shop-management
```

## Step 4: Share the Link

Once the repository is set up, share this link with anyone:
```
https://github.com/FRIEND_USERNAME/sweet-shop-management
```

To open in browser editor, use:
```
https://github.dev/FRIEND_USERNAME/sweet-shop-management
```

## Troubleshooting

### If you get "permission denied":
- Your friend needs to add you as a collaborator
- Or your friend needs to push the code themselves

### If repository doesn't exist:
- Make sure your friend created it first
- Check the repository name matches exactly

### To change remote later:
```bash
git remote remove origin
git remote add origin https://github.com/NEW_USERNAME/sweet-shop-management.git
git push -u origin main
```

