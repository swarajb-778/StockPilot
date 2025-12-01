# 🎯 Getting Started with StockPilot

Welcome! This guide will walk you through setting up your StockPilot project from start to finish.

## ✅ What's Already Done

- ✅ Git repository initialized
- ✅ Initial files committed
- ✅ Documentation created
- ✅ .gitignore configured

## 🚀 Next Steps (Follow in Order)

### Step 1: Push to GitHub (DO THIS FIRST!)

1. **Create a new repository on GitHub:**
   - Go to: https://github.com/new
   - Repository name: `StockPilot`
   - Description: "Full-stack inventory management dashboard with Next.js, Node.js, and AWS"
   - Choose Public or Private
   - **DON'T** initialize with README (you already have one!)
   - Click "Create repository"

2. **Connect your local repo to GitHub:**
   ```bash
   cd /Users/swarajbangar/Documents/Coding/StockPilot
   
   # Replace YOUR_USERNAME with your actual GitHub username!
   git remote add origin https://github.com/YOUR_USERNAME/StockPilot.git
   
   # Push your code
   git branch -M main
   git push -u origin main
   ```

3. **Verify it worked:**
   - Go to `https://github.com/YOUR_USERNAME/StockPilot`
   - You should see all your files!

### Step 2: Set Up Frontend (Next.js)

```bash
# Make sure you're in the project root
cd /Users/swarajbangar/Documents/Coding/StockPilot

# Create Next.js app
npx create-next-app@latest client

# Answer the prompts:
# ✅ Would you like to use TypeScript? → Yes
# ✅ Would you like to use ESLint? → Yes
# ✅ Would you like to use Tailwind CSS? → Yes
# ✅ Would you like to use `src/` directory? → Yes
# ✅ Would you like to use App Router? → Yes
# ✅ Would you like to customize the default import alias? → No

# Install additional frontend dependencies
cd client
npm install @reduxjs/toolkit react-redux
npm install @mui/x-data-grid @mui/material @emotion/react @emotion/styled
npm install axios

# Commit your changes
cd ..
git add client/
git commit -m "feat: initialize Next.js frontend with dependencies"
git push origin main
```

### Step 3: Set Up Backend (Node.js)

```bash
# Create server directory
mkdir server
cd server

# Initialize package.json
npm init -y

# Install dependencies
npm install express cors dotenv
npm install @prisma/client
npm install -D typescript @types/node @types/express @types/cors ts-node nodemon prisma

# Initialize TypeScript
npx tsc --init

# Initialize Prisma
npx prisma init

# Go back to root and commit
cd ..
git add server/
git commit -m "feat: initialize Node.js backend with Prisma"
git push origin main
```

### Step 4: Configure Environment Variables

```bash
# Copy the example env file
cp .env.example client/.env.local
cp .env.example server/.env

# Edit the files (use your preferred editor)
# For now, you can leave the AWS credentials blank
```

### Step 5: Test Your Setup

```bash
# Terminal 1 - Start the frontend
cd client
npm run dev
# Should run on http://localhost:3000

# Terminal 2 - Start the backend (after you create the server entry file)
cd server
npm run dev
# Should run on http://localhost:8000
```

## 📚 Important Files to Read

1. **QUICK_GIT_REFERENCE.md** - Your daily Git cheat sheet
2. **GIT_WORKFLOW_GUIDE.md** - Comprehensive Git guide
3. **PROJECT_STRUCTURE.md** - How to organize your code
4. **CONTRIBUTING.md** - Best practices for commits

## 🔄 Your Daily Workflow

Every time you code:

```bash
# 1. Navigate to project
cd /Users/swarajbangar/Documents/Coding/StockPilot

# 2. Pull latest changes (if working from multiple computers)
git pull origin main

# 3. Make your changes (code, code, code...)

# 4. Check what changed
git status

# 5. Add your changes
git add .

# 6. Commit with a descriptive message
git commit -m "feat: describe what you did"

# 7. Push to GitHub
git push origin main
```

## 💡 Commit Message Examples

Use these as templates:

```bash
# Features
git commit -m "feat: add user authentication"
git commit -m "feat: create product listing page"
git commit -m "feat: implement inventory search"

# Fixes
git commit -m "fix: resolve login button styling"
git commit -m "fix: correct API endpoint URL"

# Documentation
git commit -m "docs: update README with API docs"
git commit -m "docs: add component usage examples"

# Styling
git commit -m "style: format code with prettier"
git commit -m "style: improve dashboard layout"

# Refactoring
git commit -m "refactor: reorganize component structure"
git commit -m "refactor: extract utility functions"
```

## 🎨 Development Best Practices

### 1. Commit Often
- Don't wait until end of day
- Commit after each logical change
- Small commits are better than large ones

### 2. Write Clear Messages
- Start with type: feat, fix, docs, style, refactor
- Be specific about what changed
- Use present tense: "add" not "added"

### 3. Test Before Committing
- Make sure your code runs
- Check for linting errors
- Test the feature you just built

### 4. Pull Before Push
```bash
git pull origin main  # Get latest
git push origin main  # Then push
```

### 5. Use Branches for Big Features
```bash
# Create feature branch
git checkout -b feature/user-dashboard

# Work on it...
git add .
git commit -m "feat: add user dashboard"

# Merge back to main
git checkout main
git merge feature/user-dashboard
git push origin main
```

## 🆘 Common Issues & Solutions

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/StockPilot.git
```

### "Permission denied"
- Check your GitHub username
- Make sure the repository exists
- You might need to set up SSH keys or use personal access token

### "Merge conflict"
```bash
# Edit the conflicting files manually
git add .
git commit -m "resolve merge conflict"
```

### "I made a mistake in my last commit"
```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Make your fixes
git add .
git commit -m "correct message"
```

## 📖 Learning Path

### Week 1: Project Setup
- ✅ Set up Git and GitHub
- ✅ Initialize Next.js frontend
- ✅ Initialize Node.js backend
- ✅ Configure environment variables

### Week 2: Frontend Basics
- Create basic layouts
- Set up Redux store
- Build UI components
- Implement routing

### Week 3: Backend Basics
- Design database schema
- Create API endpoints
- Set up authentication
- Connect to database

### Week 4: Integration
- Connect frontend to backend
- Implement data fetching
- Add error handling
- Test the full stack

### Week 5+: AWS Deployment
- Set up AWS account
- Configure RDS
- Deploy backend to EC2
- Deploy frontend to Amplify

## 🎯 Quick Commands Reference

```bash
# Git basics
git status              # See changes
git add .               # Stage all
git commit -m "msg"     # Commit
git push origin main    # Push to GitHub
git pull origin main    # Get latest

# Project navigation
cd /Users/swarajbangar/Documents/Coding/StockPilot  # Root
cd client              # Frontend
cd server              # Backend

# Development
npm run dev            # Start dev server
npm install            # Install dependencies
npm run build          # Build for production
```

## ✨ You're All Set!

Your repository is ready! Here's what you have:

1. ✅ Git repository initialized and configured
2. ✅ Professional README
3. ✅ Comprehensive documentation
4. ✅ Git workflow guides
5. ✅ Project structure plan
6. ✅ Environment templates

**Next step:** Push to GitHub following Step 1 above!

---

## 📞 Need Help?

- Read `QUICK_GIT_REFERENCE.md` for quick answers
- Check `GIT_WORKFLOW_GUIDE.md` for detailed explanations
- Review `PROJECT_STRUCTURE.md` for code organization

**Remember:** Commit often, write clear messages, and don't be afraid to experiment. You can always undo things in Git!

Happy coding! 🚀

