# Deploying ShardMint to Vercel

This guide will help you deploy both the frontend and backend of ShardMint to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Git repository (GitHub, GitLab, or Bitbucket)
3. MongoDB Atlas account for cloud database

## Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Configure the project:
     - Framework Preset: Next.js (auto-detected)
     - Root Directory: ./
     - Build Command: `npm run build` (default)
     - Output Directory: `.next` (default)

3. **Set Environment Variables**
   In the Vercel dashboard, add these environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   MONGODB_DB=shardmint_dapp
   API_SECRET_KEY=your-secret-key-here
   ```

4. **Deploy**
   Click "Deploy" and Vercel will build and deploy your app.

## Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add MONGODB_DB
   vercel env add API_SECRET_KEY
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Important Configuration

### MongoDB Setup

1. **Create MongoDB Atlas Cluster**
   - Go to https://cloud.mongodb.com
   - Create a free cluster
   - Add your Vercel IP addresses to the whitelist (or use 0.0.0.0/0 for all IPs)
   - Create a database user
   - Get your connection string

2. **Update Connection String**
   Replace the local MongoDB URL with your Atlas connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

### Vercel Configuration

The `vercel.json` file is already configured, but you can add more settings:

```json
{
  "version": 2,
  "name": "shardmint",
  "regions": ["iad1"],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### API Routes

All API routes in `/app/api/` will automatically be deployed as serverless functions:
- `/api/interactions/start`
- `/api/interactions/complete`
- `/api/interactions/list`
- `/api/interactions/by-wallet`
- `/api/interactions/stats`
- `/api/interactions/wallet/summary`

## Post-Deployment

1. **Custom Domain**
   - In Vercel dashboard, go to Settings > Domains
   - Add your custom domain

2. **Monitor Performance**
   - Check Analytics tab for performance metrics
   - Monitor Function logs for API errors

3. **Environment Variables**
   - Never commit `.env.local` to git
   - Always set production env vars in Vercel dashboard

## Troubleshooting

1. **Build Errors**
   - Check Node.js version compatibility
   - Ensure all dependencies are in `package.json`
   - Check build logs in Vercel dashboard

2. **MongoDB Connection Issues**
   - Verify MongoDB Atlas whitelist includes Vercel IPs
   - Check connection string format
   - Ensure database user has correct permissions

3. **API Route Errors**
   - Check Function logs in Vercel dashboard
   - Verify environment variables are set
   - Test API routes locally first

## Useful Commands

```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Rollback to previous deployment
vercel rollback

# Remove deployment
vercel rm [deployment-url]
```

## Security Notes

- Use strong, unique values for `API_SECRET_KEY`
- Restrict MongoDB access to specific IPs when possible
- Enable Vercel's DDoS protection
- Use environment variables for all sensitive data