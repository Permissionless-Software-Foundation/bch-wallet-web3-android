#!/usr/bin/env bash

export LC_ALL=C
set -euo pipefail

# Build ScaffoldBCH Chrome/Brave browser extension

# Create a working directory for stashing non-extension files
WORKDIR=$(mktemp -d)
echo Using workdir ${WORKDIR}

# Delete workdir on script finish
function cleanup {
    echo Deleting workdir ${WORKDIR}
    rm -rf "${WORKDIR}"
}
trap cleanup EXIT

# Stash web files that require extension changes in workdir
# mv public/manifest.json ${WORKDIR}
# mv src/components/App.js ${WORKDIR}
# mv src/components/App.css ${WORKDIR}

# Move extension src files into place for npm build
cp extension/public/manifest.json public/
#cp extension/src/components/App.js src/components/
#cp extension/src/components/App.css src/components/

# Delete the last extension build
if [ -d "extension/dist/" ]; then rm -Rf extension/dist/; fi

# Build the extension
mkdir extension/dist/
echo 'Building Extension...'

# Required for extension build rules
export INLINE_RUNTIME_CHUNK=false
export GENERATE_SOURCEMAP=false

npm run build

# Copy extension build files to extension/ folder
cp -r build/* extension/dist
cp extension/popup.html extension/dist
cp extension/public/* extension/dist

# Browserify content.js and background.js to pull in their imports
browserify extension/src/content.js -o extension/dist/content.js
browserify extension/src/background.js -o extension/dist/background.js
# npx browserify extension/src/popup.js -o extension/dist/popup.js

# Delete extension build from build/ folder (reserved for web app builds)
# rm -Rf build

# Replace original web files
rm public/manifest.json
# rm src/components/App.js
# rm src/components/App.css

# Note, src/assets/popout.svg does not need to be replaced, not used by web app
# mv ${WORKDIR}/manifest.json public/
# mv ${WORKDIR}/App.js src/components/
# mv ${WORKDIR}/App.css src/components/

echo 'Extension built and web files replaced!'
