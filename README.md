# react-bootstrap-web3-spa

This is a single page app (SPA) based on [react-bootstrap](https://www.npmjs.com/package/react-bootstrap). This app is a template to show how to build a web app that leverages the [Cash Stack](https://cashstack.info) web3 architecture, a censorship-resistant back-end for accessing the Bitcoin Cash blockchain.

This app can be compiled and uploaded to Filecoin via [web3.storage](https://web3.storage). This means a censorship-resistant front-end app (SPA) can be built, which communicates with a censorship-resistant back-end.

- [Live Demo on GitHub Pages](https://permissionless-software-foundation.github.io/react-bootstrap-web3-spa/)
- [Live Demo on Filecoin](https://bafybeic3nuawgogcfjkxxstyqyg6dmzajvkxp55ccldipwmgiyuikhrq5y.ipfs.dweb.link/)

## Major Features
- [react-bootstrap](https://react-bootstrap.github.io/) is used for general style and layout control.
- An easily customized *waiting modal* component can be invoked while waiting for network calls to complete.
- [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet) is used to access tokens and BCH on the Bitcoin Cash blockchain.
- A 'server selection' dropdown allows the user to select from an array of redundant [web3 back end servers](https://cashstack.info).
- This site is statically compiled, uploaded to Filecoin, and served over IPFS for censorship resistance and version control.
- A collapsible navigation menu is used to load different views.
- This app can be compiled into an native Android app using [react-bootstrap-web3-android](https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-android).

## Installation
```bash
git clone https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-spa
cd react-bootstrap-web3-spa
npm install
npm start
npm run build
```

## Publish to Filecoin
```bash
export FILECOIN_TOKEN=myFilecoinAPITokenFromWeb3.Storage
npm run build
npm run pub
```

Learn more about alternative deployments in the [deployment directory](./deploy)

## Support

Have questions? Need help? Join our community support
[Telegram channel](https://t.me/bch_js_toolkit)

## Donate

This open source software is developed and maintained by the [Permissionless Software Foundation](https://psfoundation.cash). If this library provides value to you, please consider making a donation to support the PSF developers:

<div align="center">
<img src="./img/donation-qr.png" />
<p>bitcoincash:qqsrke9lh257tqen99dkyy2emh4uty0vky9y0z0lsr</p>
</div>

## Repo Backup
This GitHub repository is backed up on [Radicle](https://radicle.network/get-started.html). If GitHub ever censors this respository, the code can be found in this alternative repository. [Here are extra notes on working with Radicle](https://christroutner.github.io/trouts-blog/docs/censorship/radicle).

- Project ID: rad:git:hnrkd5cjwwb5tzx37hq9uqm5ubon7ee468xcy
- [Repo on Rad Website](https://app.radicle.network/seeds/maple.radicle.garden/rad:git:hnrkd5cjwwb5tzx37hq9uqm5ubon7ee468xcy/remotes/hyyycncbn9qzqmobnhjq9rry6t4mbjiadzjoyhaknzxjcz3cxkpfpc)

This can be cloned from [PSF](https://psfoundation.info) Radicle seed node with one of these commands:
- `rad clone rad:git:hnrkd5cjwwb5tzx37hq9uqm5ubon7ee468xcy --seed radicle.fullstackcash.nl`
- `rad clone rad:git:hnrkd5cjwwb5tzx37hq9uqm5ubon7ee468xcy --seed maple.radicle.garden`

## License
[MIT](./LICENSE.md)
