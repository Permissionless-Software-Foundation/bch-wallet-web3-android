/*
  Displays the addresses associated with the wallet.
*/

class WalletInfo {
  getWalletInfo (inObj = {}) {
    try {
      const { wallet, parsedArgs } = inObj

      // Help
      if (parsedArgs.help) {
        const outMsg = (
          <span>
            <strong>wallet_info:</strong><br />
            <p>
              Display information about the wallet, including the HD path.
              Use the <i>wallet_index</i> command to change the wallet to a
              different HD path. This command will reflect the changed
              address of the wallet.
            </p>
          </span>
        )

        return {outMsg}
      }

      const outMsg = (
        <span>
          <strong>Cash Address</strong>: {wallet.walletInfo.cashAddress} <br />
          <strong>SLP Addresss</strong>: {wallet.walletInfo.slpAddress} <br />
          <strong>Private key</strong>: {wallet.walletInfo.privateKey} <br />
          <strong>Public key</strong>: {wallet.walletInfo.publicKey} <br />
          <strong>Mnemonic</strong>: {wallet.walletInfo.mnemonic} <br />
          <strong>HD Path</strong>: {wallet.walletInfo.hdPath} <br />
        </span>
      )

      return {outMsg}
    } catch (err) {
      console.error('Error in getWalletInfo(): ', err)
      throw err
    }
  }
}

export default WalletInfo
