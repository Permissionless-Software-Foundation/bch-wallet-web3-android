/*
  Displays the addresses associated with the wallet.
*/

class WalletInfo {
  getWalletInfo (inObj = {}) {
    try {
      const { appData } = inObj

      const wallet = appData.bchWallet

      return (
        <span>
          <strong>Cash Address</strong>: {wallet.walletInfo.cashAddress} <br />
          <strong>SLP Addresss</strong>: {wallet.walletInfo.slpAddress} <br />
          <strong>Private key</strong>: {wallet.walletInfo.privateKey} <br />
          <strong>Public key</strong>: {wallet.walletInfo.publicKey} <br />
          <strong>Mnemonic</strong>: {wallet.walletInfo.mnemonic} <br />
          <strong>HD Path</strong>: {wallet.walletInfo.hdPath} <br />
        </span>
      )
    } catch (err) {
      console.error('Error in getWalletInfo()')
      throw err
    }
  }
}

export default WalletInfo
