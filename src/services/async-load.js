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
  async initWallet (restURL, mnemonic, setMnemonic, updateBchWalletState) {
    const options = {
      interface: 'consumer-api',
      restURL,
      noUpdate: true
    }

    // Get the mnemonic from local storage.
    // const { mnemonic, setMnemonic } = GetMnemonic()

    let wallet
    if (mnemonic) {
      // Load the wallet from the mnemonic, if it's available from local storage.
      wallet = new this.BchWallet(mnemonic, options)
    } else {
      // Generate a new mnemonic and wallet.
      wallet = new this.BchWallet(null, options)
    }

    // const wallet = new this.BchWallet(null, options)

    // Wait for wallet to initialize.
    await wallet.walletInfoPromise
    const walletAddr = wallet.walletInfo.address

    // Get token information from the wallet. This will also initialize the UTXO store.
    const slpTokens = await wallet.listTokens(walletAddr)
    // console.log(`slpTokens: ${JSON.stringify(slpTokens, null, 2)}`)

    // Get the BCH balance of the wallet.
    const bchBalance = await wallet.getBalance(walletAddr)
    // console.log(`bchBalance: ${JSON.stringify(bchBalance, null, 2)}`)

    // Create an object containing the BCH balance and tokens.
    const balances = {
      bchBalance,
      slpTokens
    }

    // console.log(`mnemonic: ${wallet.walletInfo.mnemonic}`)
    // console.log('wallet.walletInfo: ', wallet.walletInfo)

    // Update the state of the wallet.
    updateBchWalletState(wallet.walletInfo)

    // Update the state of the wallet with the balances
    updateBchWalletState(balances)

    // Save the mnemonic to local storage.
    if (!mnemonic) {
      const newMnemonic = wallet.walletInfo.mnemonic
      setMnemonic(newMnemonic)
    }

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
