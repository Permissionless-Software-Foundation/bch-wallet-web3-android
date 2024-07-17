/*
  Displays the addresses associated with the wallet.
*/

class WalletIndex {
  async changeWalletIndex (inObj = {}) {
    try {
      const { parsedArgs, termUtils } = inObj
      let {wallet} = inObj
      const {index} = parsedArgs

      // Help
      if (parsedArgs.help) {
        const outMsg = (
          <span>
            <strong>wallet_index:</strong><br />
            <p>
              A mnemonic is a 'key ring' capable of generating millions of
              key pairs. While the web wallet only uses the first key pair,
              this command can be used to change the wallet in the terminal
              to use the other key pairs available.
            </p>
            <p>
              Calling this command without an argument will display the
              current index of the HD path used by the wallet.
            </p>
            <p>
              Change the index used by the wallet by passing <i>index=2</i> (or
              some number other than 2) as an argument.
            </p>
          </span>
        )

        return {outMsg}
      }

      // If index is not specified, display the current index of the wallet
      if (!index && index !== 0) {
        return {outMsg: `HD path: ${wallet.walletInfo.hdPath}`}
      }

      // If an index argument is passed, switch the wallet to that HD index.
      wallet = await termUtils.switchWallet({ index })

      const outMsg = `HD path: ${wallet.walletInfo.hdPath}`

      return {wallet, outMsg}
    } catch (err) {
      console.error('Error in walletIndex(): ', err)
      throw err
    }
  }
}

export default WalletIndex
