# Simple script for B-Himanshu19 to push the code
# Just run this script in the project folder

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if remote exists
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Adding remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/B-Himanshu19/Sweet-shop.git
}

# Rename branch to main
Write-Host "Setting branch to main..." -ForegroundColor Yellow
git branch -M main

# Push to GitHub
Write-Host ""
Write-Host "Pushing code to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Success! Code pushed to GitHub!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository Link:" -ForegroundColor Cyan
    Write-Host "  https://github.com/B-Himanshu19/Sweet-shop" -ForegroundColor White
    Write-Host ""
    Write-Host "Open in Browser Editor:" -ForegroundColor Cyan
    Write-Host "  https://github.dev/B-Himanshu19/Sweet-shop" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Error pushing. Make sure you have access to the repository." -ForegroundColor Red
}

