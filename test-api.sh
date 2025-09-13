#!/bin/bash

echo "Testing ShardMint API endpoints..."

# Base URL - update this with your Vercel URL if testing production
BASE_URL="http://localhost:3000"

# Test 1: List interactions
echo -e "\n1. Testing GET /api/interactions/list"
curl -X GET "$BASE_URL/api/interactions/list" -H "Content-Type: application/json"

# Test 2: Start interaction
echo -e "\n\n2. Testing POST /api/interactions/start"
curl -X POST "$BASE_URL/api/interactions/start" \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "0x1234567890123456789012345678901234567890",
    "tokenInfo": {
      "name": "Test Token",
      "symbol": "TEST",
      "supply": "1000000",
      "cap": "2000000"
    }
  }'

# Test 3: Get stats
echo -e "\n\n3. Testing GET /api/interactions/stats"
curl -X GET "$BASE_URL/api/interactions/stats" -H "Content-Type: application/json"

# Test 4: Get wallet summary
echo -e "\n\n4. Testing GET /api/interactions/wallet/summary?wallet=0x1234567890123456789012345678901234567890"
curl -X GET "$BASE_URL/api/interactions/wallet/summary?wallet=0x1234567890123456789012345678901234567890" \
  -H "Content-Type: application/json"

echo -e "\n\nTests completed!"