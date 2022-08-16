#!/bin/bash

pwd

git checkout gh-pages-test
git merge master
npm run build
rm -rf docs
cp -r build docs
git add -A
git commit -m "Redeploying to github"
git push

echo "Finished deploying to GitHub Pages"
