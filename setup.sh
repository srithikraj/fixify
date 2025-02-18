#!/bin/bash

# Instruction: Simply run `./setup.sh`

# Install node dependencies for frontend app
cd source_code/frontend
npm install

# Install node dependencies for backend server
cd ../backend
npm install

# Return root of repository
cd ../..