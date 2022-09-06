#!/bin/bash

# Bash shell script to publish the app to GitHub pages.
# Ensure you are in the gh-pages branch.

#pwd
#git checkout gh-pages
#git merge master

rm -rf build
rm -rf docs
npm run build
mv build docs
git add -A
git commit -m "Updating GitHub page"
git push
