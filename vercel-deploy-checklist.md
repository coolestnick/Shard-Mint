# Vercel Deployment Checklist for ShardMint

## Pre-deployment Steps

- [ ] Ensure your MongoDB Atlas is set up with:
  - Free M0 cluster created
  - Database user created with read/write permissions
  - Network access configured (add 0.0.0.0/0 for Vercel)
  - Connection string copied

- [ ] Update your local `.env.local` with production values:
  ```
  MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority
  MONGODB_DB=shardmint_dapp
  API_SECRET_KEY=generate-a-secure-random-string-here
  ```

- [ ] Test the application locally with production database

## Deployment Options

### Option 1: GitHub Integration (Easiest)
1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Deploy to Vercel"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Click Deploy

### Option 2: CLI Deployment
1. Run in terminal:
   ```bash
   vercel
   ```

2. Follow prompts:
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: shardmint (or your choice)
   - Directory: ./
   - Override settings: No

3. Add environment variables:
   ```bash
   vercel env add MONGODB_URI production
   vercel env add MONGODB_DB production
   vercel env add API_SECRET_KEY production
   ```

4. Deploy to production:
   ```bash
   vercel --prod
   ```

## Post-deployment

- [ ] Test deployed URL
- [ ] Check API routes are working
- [ ] Monitor logs: `vercel logs`
- [ ] Set up custom domain (optional)

## Your Deployment URLs
- Preview: Will be provided after `vercel` command
- Production: Will be provided after `vercel --prod` command