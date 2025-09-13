# Fix MongoDB Connection Error

## Issue
The error `querySrv ENOTFOUND _mongodb._tcp.cluster.mongodb.net` occurs when the MongoDB connection string has an incorrect cluster name format.

## Current Connection String (Incorrect)
```
mongodb+srv://Cluster33216:F6H1Th7j5Xh4e1IQ@cluster33216.ldxyoqv.mongodb.net/...
```

## How to Fix

1. **Get the Correct Connection String from MongoDB Atlas:**
   - Go to https://cloud.mongodb.com
   - Click on your cluster
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy the connection string

2. **The correct format should look like:**
   ```
   mongodb+srv://username:password@cluster-name.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

3. **Common Issues:**
   - Username and cluster name are different (you're using "Cluster33216" for both)
   - The cluster subdomain might be different from what you have

## Steps to Fix in Vercel

1. **Update Environment Variable in Vercel Dashboard:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Update `MONGODB_URI` with the correct connection string
   - Redeploy your application

2. **Or use Vercel CLI:**
   ```bash
   vercel env rm MONGODB_URI production
   vercel env add MONGODB_URI production
   # Paste the correct connection string when prompted
   vercel --prod
   ```

## Example of Correct Connection String
```
mongodb+srv://myusername:mypassword@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
```

Where:
- `myusername` = Your database user (not cluster name)
- `mypassword` = Your database password
- `cluster0.abcde` = Your actual cluster subdomain from MongoDB Atlas

## Verify Connection Locally First
Update your `.env.local` with the correct connection string and test:
```bash
npm run dev
# Visit http://localhost:3000/api/interactions/list
```