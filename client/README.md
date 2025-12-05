# 🎨 StockPilot Frontend

<div align="center">

**Next.js 14 Frontend Application for StockPilot Inventory Management System**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-StockPilot-blue?style=for-the-badge)](https://main.d47qigns6kh3.amplifyapp.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

</div>

---

## 🌐 Live Application

| Environment | URL | Status |
|-------------|-----|--------|
| **Production (Amplify)** | [https://main.d47qigns6kh3.amplifyapp.com](https://main.d47qigns6kh3.amplifyapp.com) | ✅ Live |
| **Development** | [http://localhost:3000](http://localhost:3000) | Local |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x | React framework with App Router |
| **React** | 18.x | UI library |
| **TypeScript** | 5.x | Type safety |
| **Redux Toolkit** | 2.x | State management |
| **RTK Query** | 2.x | API data fetching & caching |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **Material UI** | 5.x | Data Grid components |
| **Clerk** | 5.x | Authentication |
| **Framer Motion** | 11.x | Animations |
| **Recharts** | 2.x | Charts and graphs |
| **Lucide React** | Latest | Icons |

---

## 📁 Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── (components)/              # Shared UI components
│   │   │   ├── Header/                # Navigation header
│   │   │   ├── Sidebar/               # Collapsible sidebar
│   │   │   ├── Navbar/                # Top navigation
│   │   │   ├── NotificationPanel/     # Notification center
│   │   │   ├── LoadingSpinner/        # Loading states
│   │   │   ├── PageTransition/        # Page animations
│   │   │   ├── Rating/                # Star ratings
│   │   │   └── Toast/                 # Toast notifications
│   │   ├── (dashboard)/               # Dashboard pages (protected)
│   │   │   ├── layout.tsx             # Dashboard layout
│   │   │   ├── dashboard/             # Main dashboard
│   │   │   │   ├── page.tsx
│   │   │   │   ├── CardPopularProducts.tsx
│   │   │   │   ├── CardPurchaseSummary.tsx
│   │   │   │   ├── CardSalesSummary.tsx
│   │   │   │   ├── CardExpenseSummary.tsx
│   │   │   │   └── StatCard.tsx
│   │   │   ├── products/              # Product management
│   │   │   ├── inventory/             # Inventory tracking
│   │   │   ├── users/                 # User management
│   │   │   ├── expenses/              # Expense tracking
│   │   │   └── settings/              # App settings
│   │   ├── sign-in/                   # Clerk sign-in page
│   │   ├── sign-up/                   # Clerk sign-up page
│   │   ├── dashboardWrapper.tsx       # Dashboard wrapper with sidebar
│   │   ├── providers.tsx              # Context providers
│   │   ├── redux.tsx                  # Redux provider
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Landing page
│   │   └── globals.css                # Global styles
│   ├── components/ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card-spotlight.tsx
│   │   ├── feature-card.tsx
│   │   ├── background-paths.tsx
│   │   ├── canvas-reveal-effect.tsx
│   │   └── evervault-card.tsx
│   ├── lib/
│   │   └── utils.ts                   # Utility functions
│   ├── state/
│   │   ├── api.ts                     # RTK Query API slice
│   │   └── index.ts                   # Redux store setup
│   └── middleware.ts                  # Clerk auth middleware
├── public/
│   ├── StockPilotLogo.svg             # App logo
│   └── ...
├── tailwind.config.ts                 # Tailwind configuration
├── next.config.mjs                    # Next.js configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Clerk account (for authentication)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**

Create a `.env.local` file:
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_key_here
CLERK_SECRET_KEY=sk_live_your_key_here

# AWS Resources (Production)
NEXT_PUBLIC_S3_PRODUCTS_URL=https://stockpilot-images-317635640887.s3.us-west-1.amazonaws.com/products
NEXT_PUBLIC_CLOUDFRONT_URL=https://d1k3m3m0ppxz1z.cloudfront.net
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open the application:**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://54.176.27.132:8000` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | `pk_live_...` |
| `CLERK_SECRET_KEY` | Clerk secret key | `sk_live_...` |
| `NEXT_PUBLIC_S3_PRODUCTS_URL` | S3 product images URL | `https://stockpilot-images-317635640887.s3.us-west-1.amazonaws.com/products` |
| `NEXT_PUBLIC_CLOUDFRONT_URL` | CloudFront CDN URL | `https://d1k3m3m0ppxz1z.cloudfront.net` |

---

## 📱 Pages & Routes

### Public Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with feature showcase |
| `/sign-in` | Clerk sign-in page |
| `/sign-up` | Clerk sign-up page |

### Protected Routes (Dashboard)

| Route | Description |
|-------|-------------|
| `/dashboard` | Main dashboard with analytics |
| `/products` | Product management (CRUD) |
| `/inventory` | Inventory tracking |
| `/users` | User management |
| `/expenses` | Expense tracking & summary |
| `/settings` | Application settings |

---

## 🎨 UI Components

### Dashboard Components

| Component | Location | Description |
|-----------|----------|-------------|
| `CardPopularProducts` | `/dashboard` | Top selling products |
| `CardSalesSummary` | `/dashboard` | Sales analytics chart |
| `CardPurchaseSummary` | `/dashboard` | Purchase analytics |
| `CardExpenseSummary` | `/dashboard` | Expense breakdown |
| `StatCard` | `/dashboard` | Metric display cards |

### Shared Components

| Component | Location | Description |
|-----------|----------|-------------|
| `Header` | `/(components)` | Navigation header with user info |
| `Sidebar` | `/(components)` | Collapsible navigation sidebar |
| `Navbar` | `/(components)` | Top navigation bar |
| `NotificationPanel` | `/(components)` | Notification center with badges |
| `LoadingSpinner` | `/(components)` | Loading state indicator |
| `PageTransition` | `/(components)` | Animated page transitions |
| `Rating` | `/(components)` | Star rating display |
| `Toast` | `/(components)` | Toast notifications |

---

## 🔄 State Management

### Redux Store Structure

```typescript
// src/state/index.ts
{
  global: {
    isSidebarCollapsed: boolean,
    isDarkMode: boolean
  },
  api: {
    // RTK Query cached data
    queries: {...},
    mutations: {...}
  }
}
```

### RTK Query API Endpoints

```typescript
// src/state/api.ts

// Dashboard
useGetDashboardMetricsQuery()

// Products
useGetProductsQuery(search?: string)
useCreateProductMutation()
useUpdateProductMutation()
useDeleteProductMutation()

// Users
useGetUsersQuery()
useCreateUserMutation()

// Expenses
useGetExpensesByCategoryQuery()

// Notifications
useGetNotificationsQuery()
useGetUnreadNotificationCountQuery()
useMarkNotificationAsReadMutation()
useMarkAllNotificationsAsReadMutation()
useDeleteNotificationMutation()
```

---

## 🎭 Animations

The app uses Framer Motion for smooth animations:

### Page Transitions
```tsx
// PageTransition component
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>
```

### Notification Panel
- Slide-in animation from the right
- Badge pulse animation for unread count
- Smooth list item transitions

### Landing Page
- Canvas reveal effects
- Background path animations
- Card spotlight effects

---

## 🌙 Theme Support

The app supports both light and dark modes:

```tsx
// Toggle dark mode
const dispatch = useAppDispatch();
dispatch(setIsDarkMode(!isDarkMode));
```

Dark mode is persisted and affects:
- Background colors
- Text colors
- Card backgrounds
- Chart colors
- Sidebar styling

---

## 📊 Charts & Visualizations

Using Recharts for data visualization:

| Chart Type | Usage |
|------------|-------|
| **Line Chart** | Sales trends over time |
| **Bar Chart** | Purchase summary |
| **Pie Chart** | Expense breakdown |
| **Area Chart** | Dashboard metrics |

---

## 🔔 Notification System

### Features
- Real-time unread count badge
- Mark as read/unread
- Mark all as read
- Delete notifications
- Filter by type (stock_alert, order, system_error, info)
- Animated panel with slide-in effect

### Notification Types
| Type | Icon | Color |
|------|------|-------|
| `stock_alert` | Package | Orange |
| `order_notification` | ShoppingCart | Blue |
| `system_error` | AlertTriangle | Red |
| `info` | Info | Gray |

---

## 🖥️ AWS Amplify Deployment

### Build Settings

```yaml
# amplify.yml
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
          - .next/cache/**/*
    appRoot: client
```

### Environment Variables in Amplify

Set these in AWS Amplify Console > App Settings > Environment Variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://54.176.27.132:8000` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your Clerk key |
| `CLERK_SECRET_KEY` | Your Clerk secret |
| `NEXT_PUBLIC_S3_PRODUCTS_URL` | `https://stockpilot-images-317635640887.s3.us-west-1.amazonaws.com/products` |
| `NEXT_PUBLIC_CLOUDFRONT_URL` | `https://d1k3m3m0ppxz1z.cloudfront.net` |

---

## 🧪 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start development server |
| `build` | `npm run build` | Build for production |
| `start` | `npm start` | Start production server |
| `lint` | `npm run lint` | Run ESLint |

---

## 🎯 Performance Optimizations

- **Image Optimization**: Next.js Image component with S3/CloudFront
- **Code Splitting**: Automatic with Next.js App Router
- **Caching**: RTK Query automatic caching
- **Lazy Loading**: Dynamic imports for heavy components
- **Font Optimization**: Next.js font optimization

---

## 📱 Responsive Design

The app is fully responsive with breakpoints:

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, collapsed sidebar |
| Tablet | 640px - 1024px | Compact layout |
| Desktop | > 1024px | Full layout with expanded sidebar |

---

## 📧 Contact

**Swaraj Bangar**
- Email: [Swarajbangar77@gmail.com](mailto:Swarajbangar77@gmail.com)
- Live Demo: [https://main.d47qigns6kh3.amplifyapp.com](https://main.d47qigns6kh3.amplifyapp.com)

---

© 2025 StockPilot. All rights reserved.
