/*
  This script will write the CID for the current version of the app to an
  address on the BCH blockchain. This creates an immutable, censorship-resistant,
  globally available, and secure pointer to the latest version of the app.

  The exported function expects an IPFS CID as input and returns a TXID for a
  BCH transaction.

  This function expects this environtment variable to contain a WIF private key
  with BCH to write to the blockchain:
  - REACT_BOOTSTRAP_WEB3_SPA_WIF
*/

// Global npm libraries
// const BCHJS = require('@psf/bch-js')
const BchWallet = require('minimal-slp-wallet/index')
const BchMessageLib = require('bch-message-lib/index')

async function publishToBch (cid) {
  try {
    // Get the Filecoin token from the environment variable.
    const wif = process.env.REACT_BOOTSTRAP_WEB3_SPA_WIF
    if (!wif) {
      throw new Error(
        'WIF private key not detected. Get a private key from https://wallet.fullstack.cash and save it to the REACT_BOOTSTRAP_WEB3_SPA_WIF environment variable.'
      )
    }

    // Initialize libraries for working with BCH blockchain.
    // const bchjs = new BCHJS()
    const wallet = new BchWallet(wif, {
      interface: 'consumer-api'
    })
    await wallet.walletInfoPromise
    await wallet.initialize()
    const bchMsg = new BchMessageLib({ wallet })

    // Publish the CID to the BCH blockchain.
    const hex = await bchMsg.memo.memoPush(cid, 'IPFS UPDATE')

    // Broadcast the transaction to the network.
    const txid = await wallet.ar.sendTx(hex)
    // console.log(`BCH blockchain updated with new CID. TXID: ${txid}`)
    // console.log(`https://blockchair.com/bitcoin-cash/transaction/${txid}`)

    return txid
  } catch (err) {
    console.error(err)
  }
}

module.exports = publishToBch
