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

## P2WDB Pinning Service
The P2WDB pinning service is an anonymous, censorship-resistant service that pins content on the IPFS network. This distributes the data across the globe and makes it readily available through any IPFS gateway.

## BCH Blockchain
The IPFS hash of the latest version of the web wallet is written to the Bitcoin Cash Blockchain. The last transaction in the history of the address always points to the latest copy of the app on IPFS. This protocol follows the [PS001 specification](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps001-media-sharing.md).

## Radicle
The source code and compiled app are mirrored on [Radicle](https://radicle.xyz/). This is an peer-to-peer alternative to GitHub. If this repository is ever censored by GitHub, the code can always be retrieved from the Radicle network. [This article](https://christroutner.github.io/trouts-blog/docs/censorship/radicle) covers the details of mirrioring GitHub repos onto Radicle.
