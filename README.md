# react-bootstrap-web3-spa

This is a single page app (SPA) based on [react-bootstrap](https://www.npmjs.com/package/react-bootstrap). This app is a template to show how to build a web app that leverages the [Cash Stack](https://cashstack.info) web3 architecture, a censorship-resistant back-end for accessing the Bitcoin Cash blockchain.

This app can be compiled and uploaded to Filecoin via [web3.storage](https://web3.storage). This means a censorship-resistant front-end app (SPA) can be built, which communicates with a censorship-resistant back-end.

- [Live Demo on Filecoin](https://bafybeiebpgjdznc5vyxtqoeir4yxdneu5roq7fw53755otpzqlak2am7oi.ipfs.dweb.link/)

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

## Support
The [Permissionless Software Foundation](https://psfoundation.cash) is a collection of JavaScript developers and entrepreneurs. Join our [bch-js-toolkit Telegram channel](https://t.me/bch_js_toolkit) to get community-based technical help and meet like-minded individuals.

## License
[MIT](./LICENSE.md)
