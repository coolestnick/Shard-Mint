const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

console.log('Testing MongoDB connection...');
console.log('URI:', MONGODB_URI ? 'Found' : 'Not found');
console.log('Database:', MONGODB_DB);

// Test DNS resolution
const dns = require('dns');
const url = new URL(MONGODB_URI);
const hostname = url.hostname;

console.log('\nTesting DNS resolution for:', hostname);

dns.resolve4(hostname, (err, addresses) => {
  if (err) {
    console.error('DNS resolution failed:', err.message);
  } else {
    console.log('DNS resolved to:', addresses);
  }
});

// Test connection
mongoose.connect(MONGODB_URI, {
  dbName: MONGODB_DB,
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('\n✅ MongoDB connected successfully!');
  process.exit(0);
})
.catch(err => {
  console.error('\n❌ MongoDB connection failed:', err.message);
  if (err.message.includes('querySrv')) {
    console.log('\nPossible issues:');
    console.log('1. Check if your MongoDB Atlas cluster is active');
    console.log('2. Verify the cluster name in your connection string');
    console.log('3. Make sure Network Access allows your IP (0.0.0.0/0 for all)');
    console.log('4. Try using the legacy connection string (mongodb:// instead of mongodb+srv://)');
  }
  process.exit(1);
});