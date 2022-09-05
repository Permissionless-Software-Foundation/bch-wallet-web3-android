# bch-wallet-web3-android
This is a web-based single page app (SPA) written in React. It provides non-custodial wallet features for the Bitcoin Cash blockchain, including support for SLP tokens and NFTs. In includes [CapacitorJS](https://capacitorjs.com/) libraries and configuration so that it can be compiled into a native Android APK file.

- [Live Demo on Filecoin](https://bafybeiheljff4sfsujx2kb4hna7rlotjlmgfftcwtznhzxiltojmc2nkbm.ipfs.dweb.link/)
- [Live Demo on GitHub Pages](https://permissionless-software-foundation.github.io/bch-wallet-web3-android/)
- [Download latest APK file](./android/apk/bch-web3-wallet.apk)

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

## For JavaScript Developers

This is a fork of [react-bootstrap-web3-android](https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-android), which is a fork of [react-bootstrap-web3-spa](https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-spa). That boilerplate is used to build a React app using the [react-boostrap library](https://www.npmjs.com/package/react-bootstrap).

Additional documentation:
- [Developer Documentation](./dev-docs)
- [Deployment Targets](./deploy)

## Repo Backup
This GitHub repository is backed up on [Radicle](https://radicle.network/get-started.html). If GitHub ever censors this respository, the code can be found in this alternative repository. [Here are extra notes on working with Radicle](https://christroutner.github.io/trouts-blog/docs/censorship/radicle).

- Project ID: rad:git:hnrkd5cjwwb5tzx37hq9uqm5ubon7ee468xcy
- [Repo on Rad Website](https://app.radicle.network/seeds/maple.radicle.garden/rad:git:hnrkd5cjwwb5tzx37hq9uqm5ubon7ee468xcy/remotes/hyyycncbn9qzqmobnhjq9rry6t4mbjiadzjoyhaknzxjcz3cxkpfpc)

This can be cloned from [PSF](https://psfoundation.info) Radicle seed node with one of these commands:
- `rad clone rad:git:hnrkd5cjwwb5tzx37hq9uqm5ubon7ee468xcy --seed radicle.fullstackcash.nl`
- `rad clone rad:git:hnrkd5cjwwb5tzx37hq9uqm5ubon7ee468xcy --seed maple.radicle.garden`

## License
[MIT](./LICENSE.md)
