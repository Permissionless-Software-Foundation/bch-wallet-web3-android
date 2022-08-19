#!/bin/bash

# This is the master deploy script that launches the other scripts.

pwd

# Deploy to GitHub pages
./deploy/deploy-to-gh-pages.sh
./deploy/deploy-to-filecoin.sh
