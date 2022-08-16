#!/bin/bash

# This is a bash script that will publish the app to GitHub pages.

git checkout gh-pages-test
git merge master
npm run build
rm -rf docs
cp -r build docs
git add -A
git commit -m "Redeploying to github"
git push
git checkout master

echo "Finished deploying to GitHub Pages"
