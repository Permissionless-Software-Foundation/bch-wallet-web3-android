This is a highly decentralized, web3-first application. It is published to GitHub pages for the convenience of web2 browsers. The primary target deployment target is a side-loaded Android app. The secondary deployment target is a web app delivered through an IPFS gateway.

This `deploy` directory contains shell scripts for deploying the web wallet to these different environments:

- GitHub Pages
- Filecoin
- P2WDB Pinning Service
- BCH Blockchain
- Radicle

## GitHub Pages
This deployment if full web2 infrastructure. As a result, it's convenient, but it's also the highly susceptible to censorship by GitHub.
- [Web Wallet on GitHub Pages](https://permissionless-software-foundation.github.io/bch-wallet-web3-android/)

## Filecoin
The compiled output is also uploaded to Filecoin via the [web3.storage](https://web3.storage) API. This is a free service that preserves the data on Filecoin, but can be pretty sluggish when retrieving the data over an IPFS gateway.

Currently the compiled web app is published to Filecoin, and the souce code is uploaded manually. Eventually the source code will also be published automatically.

## BCH Blockchain
The IPFS hash of the latest version of the app is written to the Bitcoin Cash Blockchain. The last transaction in the history of the address always points to the latest copy of the app on IPFS. This protocol follows the [PS001 specification](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps001-media-sharing.md).
The BCH blockchain allows the IPFS hash to be 'anchored' in a persistent, immutable, censorship-resistant, highly-available database. This allows web browsers to easily and securely locate the latest version of the app, using the [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet) library.

## P2WDB Pinning Service
(Not yet functional)
The P2WDB pinning service is an anonymous, censorship-resistant service that pins content on the IPFS network. This distributes the data across the globe and makes it readily available through any IPFS gateway.

## Radicle
(Not yet functional)
The source code and compiled app are mirrored on [Radicle](https://radicle.xyz/). This is an peer-to-peer alternative to GitHub. If this repository is ever censored by GitHub, the code can always be retrieved from the Radicle network. [This article](https://christroutner.github.io/trouts-blog/docs/censorship/radicle) covers the details of mirrioring GitHub repos onto Radicle.
