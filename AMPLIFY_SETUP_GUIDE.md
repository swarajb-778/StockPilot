# 🚀 AWS Amplify Setup Guide - Step by Step

## Prerequisites Checklist

Before we start, make sure you have:
- [ ] AWS Account (if not, create one at [aws.amazon.com](https://aws.amazon.com))
- [ ] GitHub repository with your StockPilot code
- [ ] Your code pushed to GitHub (main branch)

---

## Step 1: Sign in to AWS Console

### If you DON'T have an AWS account yet:

1. Go to [https://aws.amazon.com](https://aws.amazon.com)
2. Click **"Create an AWS Account"**
3. Enter your email and password
4. Choose "Personal" account type
5. Enter payment method (required but won't charge within Free Tier)
6. Verify your phone number
7. Select **"Basic Support - Free"** plan
8. Complete the account creation

### If you HAVE an AWS account:

**Option A: Sign in as Root User**
1. Click **"Sign in using root user email"**
2. Enter your email address
3. Enter your password
4. Complete MFA if enabled

**Option B: Sign in as IAM User (recommended)**
1. Enter your 12-digit Account ID
2. Enter your IAM username
3. Enter your password

---

## Step 2: Navigate to AWS Amplify

After signing in:
1. In the AWS Console search bar at the top, type **"Amplify"**
2. Click on **"AWS Amplify"** in the results
3. You'll land on the Amplify Console

---

## Step 3: Create a New Amplify App

### 3.1 Start New App
1. Click **"Create new app"** (orange button)
2. Or if you have existing apps, click **"New app"** → **"Host web app"**

### 3.2 Choose Git Provider
1. Select **"GitHub"** as your repository source
2. Click **"Next"**

### 3.3 Authorize GitHub (First time only)
1. Click **"Authorize AWS Amplify"** in the popup
2. Sign in to your GitHub account if needed
3. Authorize AWS to access your repositories

### 3.4 Select Repository
1. Find and select your **"StockPilot"** repository from the dropdown
2. Select the branch: **"main"** (or your primary branch)
3. Check **"Connecting a monorepo? Pick a folder"**
4. Enter: **client** (this is where your Next.js app is)
5. Click **"Next"**

---

## Step 4: Configure Build Settings

### 4.1 App Settings
- **App name**: StockPilot (or your preferred name)
- **Environment**: Production

### 4.2 Build and Test Settings
Amplify should auto-detect Next.js. Verify the settings match:

```yaml
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

If it doesn't auto-detect, click **"Edit"** and paste the above configuration.

### 4.3 Advanced Settings - Environment Variables

**⚠️ IMPORTANT: Add these environment variables!**

Click **"Advanced settings"** → **"Add environment variable"**

Add the following variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8000` | (Temporary - update after EC2 setup) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_xxx...` | Your Clerk publishable key |
| `CLERK_SECRET_KEY` | `sk_test_xxx...` | Your Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | Clerk sign-in route |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` | Clerk sign-up route |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/dashboard` | Redirect after sign-in |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/dashboard` | Redirect after sign-up |

### 4.4 Service Role
- Select **"Create and use a new service role"**
- Or use existing if you have one

Click **"Next"**

---

## Step 5: Review and Deploy

### 5.1 Review Settings
- Verify all settings are correct
- Check environment variables are added

### 5.2 Deploy
1. Click **"Save and deploy"**
2. Amplify will start building your app
3. This takes about 3-5 minutes

---

## Step 6: Monitor Deployment

### 6.1 Watch Build Progress
You'll see the build go through these stages:
1. **Provision** - Setting up build environment
2. **Build** - Installing dependencies & building Next.js
3. **Deploy** - Deploying to Amplify hosting
4. **Verify** - Final verification

### 6.2 Build Logs
- Click on the build to see detailed logs
- If it fails, check the logs for errors

### 6.3 Common Build Errors & Fixes

| Error | Solution |
|-------|----------|
| `npm ci` failed | Check package-lock.json is committed |
| Module not found | Verify all dependencies in package.json |
| TypeScript errors | Fix any type errors locally first |
| Environment variable missing | Add missing env vars in Amplify console |

---

## Step 7: Access Your Deployed App

### 7.1 Get Your App URL
After successful deployment:
1. Click on your app name
2. Find the **Domain** section
3. Your URL will look like: `https://main.d1234abcdef.amplifyapp.com`

### 7.2 Test Your App
1. Open the URL in your browser
2. You should see your StockPilot landing page
3. Try signing in (Clerk authentication should work)

---

## Step 8: Set Up Custom Domain (Optional)

### 8.1 Add Custom Domain
1. Go to **"Domain management"** in left sidebar
2. Click **"Add domain"**
3. Enter your domain name (e.g., `stockpilot.com`)
4. Follow DNS configuration instructions

### 8.2 SSL Certificate
- Amplify automatically provisions free SSL certificates
- Your site will be HTTPS by default

---

## Step 9: Configure Auto-Deploy (Already Set Up!)

Amplify automatically:
- ✅ Deploys when you push to main branch
- ✅ Creates preview deployments for pull requests
- ✅ Rolls back if deployment fails

---

## Step 10: Update API URL (After EC2 Setup)

Once you set up EC2 for your backend:

1. Go to Amplify Console → Your App
2. Click **"Environment variables"** in left sidebar
3. Edit `NEXT_PUBLIC_API_BASE_URL`
4. Change from `http://localhost:8000` to your EC2 URL:
   - `http://your-ec2-public-ip:8000` (or)
   - `https://api.yourdomain.com` (if using custom domain)
5. Click **"Save"**
6. Redeploy to apply changes

---

## 📊 Free Tier Usage Tracking

### Check Your Usage
1. Go to Amplify Console
2. Click your app name
3. Go to **"Monitoring"** in left sidebar
4. View build minutes and hosting usage

### Free Tier Limits
| Resource | Free Limit | Typical Usage |
|----------|------------|---------------|
| Build minutes | 1,000/month | ~10 mins/build |
| Hosting storage | 5 GB | ~500 MB |
| Data transfer | 15 GB/month | Depends on traffic |

---

## 🔧 Troubleshooting

### Build Fails with "Command not found: npm"
- This shouldn't happen with Amplify's default image
- Check your build settings are using the correct base image

### Environment Variables Not Working
- Make sure variable names are exactly correct (case-sensitive)
- Prefix client-side vars with `NEXT_PUBLIC_`
- Redeploy after adding/changing env vars

### Site Shows Blank Page
- Check browser console for errors
- Verify API URL is correct
- Check Clerk keys are valid

### API Calls Failing
- The API URL is currently set to localhost (won't work in production)
- You need to set up EC2 first, then update the URL

---

## ✅ Amplify Setup Checklist

```
□ AWS Account created and verified
□ GitHub repository connected
□ Build settings configured
□ Environment variables added:
  □ NEXT_PUBLIC_API_BASE_URL
  □ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  □ CLERK_SECRET_KEY
  □ NEXT_PUBLIC_CLERK_SIGN_IN_URL
  □ NEXT_PUBLIC_CLERK_SIGN_UP_URL
  □ NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
  □ NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
□ First deployment successful
□ App accessible via Amplify URL
□ Auto-deploy enabled for main branch
```

---

## 🎉 Congratulations!

You've successfully deployed your StockPilot frontend to AWS Amplify!

### Next Steps:
1. **Set up EC2** for your backend API
2. **Set up RDS** for PostgreSQL database
3. **Update API URL** in Amplify environment variables
4. **Set up S3** for product images
5. **Configure CloudFront** for CDN

---

## Quick Reference

| Item | Value |
|------|-------|
| AWS Region | us-west-1 (N. California) |
| Amplify App URL | [https://main.d47qigns6kh3.amplifyapp.com](https://main.d47qigns6kh3.amplifyapp.com) |
| Backend API URL | [http://54.176.27.132:8000](http://54.176.27.132:8000) |
| S3 Products URL | [https://stockpilot-images-317635640887.s3.us-west-1.amazonaws.com/products](https://stockpilot-images-317635640887.s3.us-west-1.amazonaws.com/products) |
| CloudFront URL | [https://d1k3m3m0ppxz1z.cloudfront.net](https://d1k3m3m0ppxz1z.cloudfront.net) |
| Build Time | ~3-5 minutes |
| Free Tier | 1,000 build mins, 5 GB storage |

---

## 📧 Contact

For questions or support, contact: [Swarajbangar77@gmail.com](mailto:Swarajbangar77@gmail.com)

---

**Need help?** Check the [AWS Amplify Documentation](https://docs.amplify.aws/nextjs/)

---

© 2025 StockPilot. All rights reserved.
