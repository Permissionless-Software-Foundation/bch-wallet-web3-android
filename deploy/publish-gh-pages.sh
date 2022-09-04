#!/bin/bash

# Bash shell script to publish the app to GitHub pages.
# Ensure you are in the gh-pages branch.

#pwd
#git checkout gh-pages
#git merge master

npm run build
cp -r build docs
git add -A
git commit -m "Updating GitHub page"
git push
