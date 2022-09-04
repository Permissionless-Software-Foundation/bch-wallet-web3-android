# react-bootstrap-web3-android
This is a fork of [react-bootstrap-web3-spa](https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-spa). That boilerplate is used to build a React app using the [react-boostrap library](https://www.npmjs.com/package/react-bootstrap).

This repository adds [CapacitorJS](https://capacitorjs.com/) libraries and configuration, in order to compile the SPA into a native Android app APK file.

- [Live Demo on Filecoin](https://bafybeibp6zaa7rjwamxagleukndta4il7w6hntztkq3oot222kzipw4bda.ipfs.dweb.link/)
- [Download latest APK file](./android/apk/capacitor-web3-app.apk)

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
