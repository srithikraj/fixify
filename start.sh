#!/bin/bash

# Instruction: Simply run `./start.sh`

# run setup script (installs npm packages for frontend app and backend server)
source setup.sh

# Start backend server
cd source_code/backend
node server.js &

# Start frontend app
cd ../frontend
npm run dev &

# Keep the script running
wait