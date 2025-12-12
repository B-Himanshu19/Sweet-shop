# PowerShell script to set up GitHub remote for friend's repository

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Remote Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get friend's GitHub username
$friendUsername = Read-Host "Enter your friend's GitHub username"

if ([string]::IsNullOrWhiteSpace($friendUsername)) {
    Write-Host "Error: GitHub username cannot be empty!" -ForegroundColor Red
    exit 1
}

# Repository name
$repoName = "sweet-shop-management"

# Construct repository URL
$repoUrl = "https://github.com/$friendUsername/$repoName.git"

Write-Host ""
Write-Host "Repository URL: $repoUrl" -ForegroundColor Yellow
Write-Host ""

# Check if remote already exists
$existingRemote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Warning: Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
    $remove = Read-Host "Do you want to remove it and add new one? (y/n)"
    if ($remove -eq "y" -or $remove -eq "Y") {
        git remote remove origin
        Write-Host "Removed existing remote." -ForegroundColor Green
    } else {
        Write-Host "Keeping existing remote. Exiting." -ForegroundColor Yellow
        exit 0
    }
}

# Add remote
Write-Host "Adding remote origin..." -ForegroundColor Cyan
git remote add origin $repoUrl

if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote added successfully!" -ForegroundColor Green
} else {
    Write-Host "Error adding remote. It might already exist." -ForegroundColor Red
    exit 1
}

# Rename branch to main
Write-Host ""
Write-Host "Renaming branch to 'main'..." -ForegroundColor Cyan
git branch -M main

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Make sure your friend has created the repository: $repoUrl" -ForegroundColor Yellow
Write-Host "2. Make sure the repository is PUBLIC" -ForegroundColor Yellow
Write-Host "3. Your friend should add you as a collaborator (Settings -> Collaborators)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Then run:" -ForegroundColor Cyan
Write-Host "  git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Browser Links:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$repoLink = "https://github.com/$friendUsername/$repoName"
$devLink = "https://github.dev/$friendUsername/$repoName"
$codespaceLink = "https://codespaces.new/$friendUsername/$repoName"

Write-Host "Repository Link:" -ForegroundColor Green
Write-Host "  $repoLink" -ForegroundColor White
Write-Host ""
Write-Host "Open in Browser Editor (GitHub.dev):" -ForegroundColor Green
Write-Host "  $devLink" -ForegroundColor White
Write-Host ""
Write-Host "Open in Codespaces:" -ForegroundColor Green
Write-Host "  $codespaceLink" -ForegroundColor White
Write-Host ""
