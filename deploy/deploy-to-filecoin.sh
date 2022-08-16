#!/bin/bash

# This is a bash shell script that will publish the app to Filecoin.
# NOTE: this will not publish the source code. Just the compiled app.

# Load environment variables.
source ~/.profile

# Upload the app to filecoin.
node ./deploy/publish-to-filecoin.js
