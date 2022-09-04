# Deploy
This directory contains scripts for deploying the app to different platforms and blockchains.

## App Deployment

### Blockchains
- Filecoin - The compiled app is uploaded to the Filecoin blockchain using [publish-filecoin.js](./publish-filecoin.js). Running this script requires a free API key from [web3.storage](https://web3.storage).
- IPFS - The files are also pinned by the Pinata service using [publish-pinata.js](./publish-filecoin.js). Running this script requires a free JWT token from [Pinata](https://pinata.cloud).
- Bitcoin Cash - The IPFS CID is written to the Bitcoin Cash blockchain with [publish-bch.js](/publish-bch.js) This creates an immutable, censorship-resistant, globally available, and secure pointer to the latest version of the app.

The above deployment scripts are orchestrated with [publish-main.js](`./publish-main.js`). This script is run by executing `npm run pub`.

### GitHub Pages
The app can also be deployed to GitHub pages. This requires switching to the `gh-pages` branch and running the command `npm run pub:ghp`.

## Code Deployment
The code in this repository is backed up to the [Radicle](https://radicle.network/get-started.html) network, as GitHub has been increasing its censorship of code. Find instructions for *consuming* the code in the [top-level README](../README.md). To learn how install Radicle on your own machine and collaborate on the code that way, check out [this research article](https://christroutner.github.io/trouts-blog/docs/censorship/radicle).
