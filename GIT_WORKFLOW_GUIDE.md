# Git Workflow Guide for StockPilot

This guide will help you understand how to use Git for version control in your StockPilot project.

## 📚 Table of Contents
1. [Initial Setup](#initial-setup)
2. [Daily Workflow](#daily-workflow)
3. [Common Commands](#common-commands)
4. [Best Practices](#best-practices)

## 🚀 Initial Setup

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the "+" icon in the top right → "New repository"
3. Name it: `StockPilot`
4. Choose visibility (Public/Private)
5. **DON'T** initialize with README (we already have one)
6. Click "Create repository"

### 2. Connect Your Local Repository to GitHub

```bash
# Navigate to your project directory
cd /Users/swarajbangar/Documents/Coding/StockPilot

# Initialize git (already done if you see .git folder)
git init

# Add all files to staging
git add .

# Make your first commit
git commit -m "Initial commit: Project setup"

# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/StockPilot.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 📅 Daily Workflow

### When You Start Working

```bash
# Make sure you have the latest changes
git pull origin main
```

### While Working

```bash
# Check what files you've changed
git status

# See the actual changes
git diff
```

### When You're Done with a Feature/Change

```bash
# Stage specific files
git add filename.js

# Or stage all changed files
git add .

# Commit with a descriptive message
git commit -m "feat: add user login functionality"

# Push to GitHub
git push origin main
```

## 🔧 Common Commands

### Checking Status

```bash
# See what's changed
git status

# See commit history
git log

# See recent commits (prettier)
git log --oneline --graph --decorate
```

### Staging Changes

```bash
# Stage a specific file
git add path/to/file.js

# Stage all files
git add .

# Stage all files of a certain type
git add *.js

# Unstage a file
git reset path/to/file.js
```

### Committing

```bash
# Commit staged changes
git commit -m "Your descriptive message"

# Commit with detailed message
git commit -m "Short summary" -m "Longer description"

# Stage and commit in one command
git commit -am "Your message"  # Only works for modified files, not new ones
```

### Pushing & Pulling

```bash
# Push to GitHub
git push origin main

# Pull from GitHub
git pull origin main

# Force pull (careful! This overwrites local changes)
git fetch origin
git reset --hard origin/main
```

### Branching (For Larger Features)

```bash
# Create a new branch
git branch feature-name

# Switch to that branch
git checkout feature-name

# Create and switch in one command
git checkout -b feature-name

# See all branches
git branch

# Merge branch into main
git checkout main
git merge feature-name

# Delete a branch
git branch -d feature-name
```

### Undoing Changes

```bash
# Discard changes in a specific file
git checkout -- filename.js

# Discard all local changes
git reset --hard

# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo last commit and discard changes
git reset --hard HEAD~1

# Revert a specific commit (creates new commit)
git revert commit-hash
```

## ✅ Best Practices

### 1. Commit Often
- Make small, focused commits
- Don't wait until end of day to commit
- Each commit should represent one logical change

### 2. Write Good Commit Messages

**Good:**
```
feat: add product search functionality
fix: resolve login button alignment issue
docs: update API documentation
```

**Bad:**
```
changes
fixed stuff
update
asdfasdf
```

### 3. Pull Before You Push
```bash
git pull origin main
git push origin main
```

### 4. Don't Commit Sensitive Information
- Never commit `.env` files with real credentials
- Use `.env.example` instead
- Check `.gitignore` is working

### 5. Use Branches for Features
```bash
# For big features
git checkout -b feature/user-authentication
# Work on it...
git checkout main
git merge feature/user-authentication
```

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Check status | `git status` |
| Stage all changes | `git add .` |
| Commit | `git commit -m "message"` |
| Push to GitHub | `git push origin main` |
| Pull from GitHub | `git pull origin main` |
| See history | `git log --oneline` |
| Create branch | `git checkout -b branch-name` |
| Undo changes | `git checkout -- filename` |

## 🆘 Common Issues

### Issue: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/StockPilot.git
```

### Issue: Merge conflicts
```bash
# Edit the conflicting files manually
git add .
git commit -m "Resolve merge conflict"
```

### Issue: Forgot to pull before making changes
```bash
git stash                 # Save your changes temporarily
git pull origin main      # Get latest changes
git stash pop             # Reapply your changes
```

## 📝 Example Workflow Session

```bash
# Start your day
cd /Users/swarajbangar/Documents/Coding/StockPilot
git pull origin main

# Make some changes to files...

# Check what changed
git status
git diff

# Stage and commit
git add .
git commit -m "feat: implement dashboard analytics"

# Push to GitHub
git push origin main

# Continue working...
```

## 🎓 Learning Resources

- [GitHub Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Visualizing Git](https://git-school.github.io/visualizing-git/)
- [Learn Git Branching](https://learngitbranching.js.org/)

---

**Remember:** Don't be afraid to commit! Git is designed to help you, and you can always undo things if needed.

