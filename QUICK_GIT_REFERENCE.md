# 🚀 Quick Git Reference for StockPilot

## First Time Setup (Do This Once)

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `StockPilot`
3. Choose Public or Private
4. **Don't** check "Initialize with README"
5. Click "Create repository"

### Step 2: Connect to GitHub
```bash
cd /Users/swarajbangar/Documents/Coding/StockPilot

# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/StockPilot.git

# Push your code
git branch -M main
git push -u origin main
```

---

## Daily Use (Your Regular Workflow)

### ✅ Every Time You Make Changes:

```bash
# 1. Check what you changed
git status

# 2. Add your changes
git add .

# 3. Commit with a message
git commit -m "describe what you did"

# 4. Push to GitHub
git push origin main
```

### 📝 Example Session:

```bash
# You just added login page...

git status                           # See what changed
git add .                            # Stage all changes
git commit -m "feat: add login page" # Commit with message
git push origin main                 # Push to GitHub

# Done! Your code is on GitHub ✨
```

---

## Commit Message Templates

Copy and modify these:

```bash
git commit -m "feat: add dashboard component"
git commit -m "fix: resolve navbar alignment issue"
git commit -m "docs: update README with setup instructions"
git commit -m "style: format code with prettier"
git commit -m "refactor: reorganize component structure"
```

---

## 🆘 Quick Fixes

### Forgot to pull latest changes?
```bash
git pull origin main
```

### Made a mistake? Undo last commit:
```bash
git reset --soft HEAD~1  # Keeps your changes
```

### Want to see what changed?
```bash
git diff                 # See changes
git log --oneline        # See history
```

### Discard all local changes (careful!):
```bash
git reset --hard HEAD
```

---

## 🎯 Remember

1. **Commit often** - Don't wait until end of day
2. **Write clear messages** - "feat: add user login" not "changes"
3. **Pull before push** - Get latest changes first
4. **Don't commit secrets** - .env files are already ignored

---

## 📞 Need Help?

Read the full guide: `GIT_WORKFLOW_GUIDE.md`

**Most common issue?** Just ask yourself:
- Did I `git add .`?
- Did I `git commit -m "message"`?
- Did I `git push origin main`?

That's 90% of Git! 🎉

