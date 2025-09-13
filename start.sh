#!/bin/bash

# Start script for ShardMint application
echo "Starting ShardMint application..."

# Check if nvm is available
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    source "$HOME/.nvm/nvm.sh"
    nvm use 20 || nvm use 18.17.0 || nvm use stable
fi

# Force Next.js to use the correct architecture
export NEXT_SHARP_PATH=node_modules/sharp

# Run the Next.js development server
npx next dev