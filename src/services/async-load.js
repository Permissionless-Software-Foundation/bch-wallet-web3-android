/*
  This library gets data that requires an async wait.
*/

// Global npm libraries
import axios from 'axios'

class AsyncLoad {
  constructor () {
    this.BchWallet = false
  }

  // Load the minimal-slp-wallet which comes in as a <script> file and is
  // attached to the global 'window' object.
  async loadWalletLib () {
    do {
      if (typeof window !== 'undefined' && window.SlpWallet) {
        this.BchWallet = window.SlpWallet

        return this.BchWallet
      } else {
        console.log('Waiting for wallet library to load...')
      }

      await sleep(1000)
    } while (!this.BchWallet)
  }

  // Initialize the BCH wallet
  async initWallet (restURL) {
    const options = {
      interface: 'consumer-api',
      restURL,
      noUpdate: true
    }

    const wallet = new this.BchWallet(null, options)

    await wallet.walletInfoPromise
    // console.log(`mnemonic: ${wallet.walletInfo.mnemonic}`)

    this.wallet = wallet

    return wallet
  }

  // Get token data for a given Token ID
  async getTokenData (tokenId) {
    const tokenData = await this.wallet.getTokenData(tokenId)

    // Convert the IPFS CIDs into actual data.
    tokenData.immutableData = await this.getIpfsData(tokenData.immutableData)
    tokenData.mutableData = await this.getIpfsData(tokenData.mutableData)

    return tokenData
  }

  // Get data about a Group token
  async getGroupData (tokenId) {
    const tokenData = await this.getTokenData(tokenId)

    const groupData = {
      immutableData: tokenData.immutableData,
      mutableData: tokenData.mutableData,
      nfts: tokenData.genesisData.nfts,
      tokenId: tokenData.genesisData.tokenId
    }

    return groupData
  }

  // Given an IPFS URI, this will download and parse the JSON data.
  async getIpfsData (ipfsUri) {
    const cid = ipfsUri.slice(7)

    const downloadUrl = `https://${cid}.ipfs.dweb.link/data.json`

    const response = await axios.get(downloadUrl)
    const data = response.data

    return data
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default AsyncLoad
