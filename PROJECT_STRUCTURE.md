# StockPilot Project Structure

## 📂 Recommended Directory Layout

```
StockPilot/
│
├── client/                          # Frontend (Next.js)
│   ├── public/                      # Static assets
│   │   ├── images/
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── app/                     # Next.js 13+ app directory
│   │   │   ├── (auth)/              # Auth routes group
│   │   │   ├── (dashboard)/         # Dashboard routes group
│   │   │   ├── layout.tsx           # Root layout
│   │   │   └── page.tsx             # Home page
│   │   │
│   │   ├── components/              # Reusable components
│   │   │   ├── ui/                  # UI components
│   │   │   ├── dashboard/           # Dashboard components
│   │   │   └── shared/              # Shared components
│   │   │
│   │   ├── state/                   # Redux store
│   │   │   ├── store.ts             # Store configuration
│   │   │   ├── api.ts               # RTK Query API
│   │   │   └── slices/              # Redux slices
│   │   │
│   │   ├── types/                   # TypeScript types
│   │   ├── utils/                   # Utility functions
│   │   └── styles/                  # Global styles
│   │
│   ├── .env.local                   # Environment variables (not committed)
│   ├── .env.example                 # Environment template
│   ├── next.config.js               # Next.js configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── tsconfig.json                # TypeScript configuration
│   └── package.json                 # Dependencies
│
├── server/                          # Backend (Node.js)
│   ├── src/
│   │   ├── controllers/             # Route controllers
│   │   ├── routes/                  # API routes
│   │   ├── middleware/              # Custom middleware
│   │   ├── utils/                   # Utility functions
│   │   └── index.ts                 # Server entry point
│   │
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   ├── migrations/              # Database migrations
│   │   └── seed.ts                  # Seed data
│   │
│   ├── .env                         # Environment variables (not committed)
│   ├── .env.example                 # Environment template
│   ├── tsconfig.json                # TypeScript configuration
│   └── package.json                 # Dependencies
│
├── docs/                            # Documentation
│   ├── api/                         # API documentation
│   ├── architecture/                # Architecture diagrams
│   └── deployment/                  # Deployment guides
│
├── scripts/                         # Utility scripts
│   ├── setup.sh                     # Project setup script
│   └── deploy.sh                    # Deployment script
│
├── .github/                         # GitHub configuration
│   └── workflows/                   # GitHub Actions
│       └── ci.yml                   # CI/CD pipeline
│
├── .gitignore                       # Git ignore rules
├── README.md                        # Project overview
├── CONTRIBUTING.md                  # Contribution guidelines
├── GIT_WORKFLOW_GUIDE.md           # Git workflow guide
├── QUICK_GIT_REFERENCE.md          # Quick reference
└── PROJECT_STRUCTURE.md            # This file
```

## 🎯 Next Steps

### Phase 1: Frontend Setup
```bash
# Create Next.js app
npx create-next-app@latest client

# During setup, choose:
# ✅ TypeScript
# ✅ ESLint
# ✅ Tailwind CSS
# ✅ App Router
# ✅ src/ directory
```

### Phase 2: Backend Setup
```bash
# Create server directory
mkdir server && cd server

# Initialize Node.js project
npm init -y

# Install core dependencies
npm install express cors dotenv
npm install prisma @prisma/client
npm install -D typescript @types/node @types/express ts-node nodemon

# Initialize Prisma
npx prisma init
```

### Phase 3: Redux Setup (in client)
```bash
cd client

npm install @reduxjs/toolkit react-redux
```

### Phase 4: Material UI Data Grid
```bash
cd client

npm install @mui/x-data-grid @mui/material @emotion/react @emotion/styled
```

## 📋 Environment Variables

### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Server (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/stockpilot"
PORT=8000
NODE_ENV=development

# AWS (Later)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=your-bucket
```

## 🔄 Development Workflow

### Terminal 1: Backend
```bash
cd server
npm run dev
```

### Terminal 2: Frontend
```bash
cd client
npm run dev
```

### Terminal 3: Database (if using local Postgres)
```bash
# Prisma Studio for database management
cd server
npx prisma studio
```

## 📝 Key Files to Create

1. **client/src/state/store.ts** - Redux store configuration
2. **client/src/state/api.ts** - RTK Query API setup
3. **server/src/index.ts** - Express server setup
4. **server/prisma/schema.prisma** - Database models
5. **server/src/routes/** - API endpoints

## 🚀 Git Workflow for This Structure

```bash
# After creating client directory
git add client/
git commit -m "feat: initialize Next.js frontend"
git push origin main

# After creating server directory
git add server/
git commit -m "feat: initialize Node.js backend"
git push origin main

# Continue this pattern for each major addition
```

## 📚 Recommended File Naming

- **Components:** PascalCase (e.g., `DashboardCard.tsx`)
- **Utilities:** camelCase (e.g., `formatCurrency.ts`)
- **Routes:** kebab-case (e.g., `user-profile.tsx`)
- **Types:** PascalCase (e.g., `UserTypes.ts`)

## 🎨 Component Organization Example

```
components/
├── ui/                    # Generic UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
│
├── dashboard/             # Dashboard-specific
│   ├── StatCard.tsx
│   ├── Chart.tsx
│   └── DataTable.tsx
│
└── shared/                # Shared across app
    ├── Header.tsx
    ├── Sidebar.tsx
    └── Footer.tsx
```

---

**Note:** This structure will evolve as the project grows. Start simple and refactor as needed!

