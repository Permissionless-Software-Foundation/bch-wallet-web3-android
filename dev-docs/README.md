# Developer Docs

This file contains notes taken during software development. These notes may eventually be edited into informaiton that goes into the top-level README, or other documentation.

## Main Features of this App

- [react-bootstrap](https://react-bootstrap.github.io/) is used for general style and layout control.
- An easily customizable waiting modal component can be invoked while waiting for network calls to complete.
- [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet) is used to access tokens and BCH on the Bitcoin Cash blockchain.
- A 'server selection' dropdown allows the user to select from an array of redundent back end servers.
- This site is statically compiled, uploaded to Filecoin, and served over IPFS for censorship resistance and version control.

## File Layout

The top-level file layout of this app looks like this:

- App.js - the main application orchestates these child components:
  - GetRestUrl - retrieves the REST URL for the selected back-end web3 server from query paramenters in the URL.
  - LoadScripts - Loads the modal with a waiting spinner animation until the external script files are loaded.
  - NavMenu - the collapsible navigation menu
  - InitializedView & UnitializedView - the default Views that are displayed depending on the state of the app.
  - ServerSelect - allows the user to select a different web3 back end server.
  - Footer - Footer links

After initialization, the InitailizedView is displayed. This loads the AppBody, which is a wrapper for each View. Views are selected using the navigation menu. When one View is selected, the others are hidden.

## Loading of Wallet
The wallet library [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet) is loaded at startup, and initialized with a web3 back end server. By default, the back-end server is free-bch.fullstack.cash. However, a list of back end servers provided by the [PSF](https://psfoundation.cash) are loaded into a drop-down from a GitHub
