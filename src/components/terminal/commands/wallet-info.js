/*
  Displays the addresses associated with the wallet.
*/

class WalletInfo {
  getWalletInfo (inObj = {}) {
    try {
      const { wallet } = inObj

      return (
        <span>
          <strong>Cash Address</strong>: {wallet.walletInfo.cashAddress} <br />
          <strong>SLP Addresss</strong>: {wallet.walletInfo.slpAddress} <br />
          <strong>Private key</strong>: {wallet.walletInfo.privateKey} <br />
          <strong>Public key</strong>: {wallet.walletInfo.publicKey} <br />
          <strong>Mnemonic</strong>: {wallet.walletInfo.mnemonic} <br />
        </span>
      )
    } catch (err) {
      console.error('Error in getWalletInfo()')
      throw err
    }
  }
}

export default WalletInfo
