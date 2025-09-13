// Test server to demonstrate API functionality
// Note: The main application requires Node.js >= 18.17.0

const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'shardmint_dapp';

console.log('Starting test server...');
console.log('MongoDB URI:', MONGODB_URI ? 'Connected' : 'Not found');
console.log('Database:', MONGODB_DB);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  dbName: MONGODB_DB
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});

// Simple HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'ShardMint API Test Server',
    status: 'running',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    endpoints: [
      '/api/interactions/start',
      '/api/interactions/complete',
      '/api/interactions/list',
      '/api/interactions/by-wallet',
      '/api/interactions/stats',
      '/api/interactions/wallet/summary'
    ]
  }));
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`\n🚀 Test server running at http://localhost:${PORT}`);
  console.log('\n⚠️  Note: The full Next.js application requires Node.js >= 18.17.0');
  console.log('Your current version is 18.0.0');
  console.log('\nTo run the full application:');
  console.log('1. Update Node.js to version 18.17.0 or higher');
  console.log('2. Run: npm run dev');
});