#!/bin/bash

# Bash shell script to publish the app to GitHub pages.
pwd
git checkout gh-pages
git merge master
npm run build
cp -r build docs
git add -A
git commit -m "Updating GitHub page"
git push
