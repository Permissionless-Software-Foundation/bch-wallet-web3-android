# Pedigree

This repository is forked from [react-bootstrap-web3-android](https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-android). That repository contains the basic architecture of the web app, and all the Android dependencies. This repository focuses on the BCH-specific functionality.

This repository also depends heavily on the [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet) npm library. That is the 'wallet engine' that lets the UI perform actual cryptocurrency transactions and talk to the blockchain.

This repository largly uses React Functional Components. All Class Components are being phased out. Component state is encapsulated into objects and passed from parent to child components as objects. Most function use a single object as an input object, and that object destructured to get the input arguments. This object destructuring is done at the top of the function in order to clearly show what input variables are important for those functions.
