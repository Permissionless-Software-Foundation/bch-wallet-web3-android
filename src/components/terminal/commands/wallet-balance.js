/*
  This wallet_balance command allows the user to check the balance of the wallet
  in terms of BCH and SLP tokens.
*/

class WalletBalance {
  async getWalletBalance (inObj = {}) {
    try {
      const { wallet, parsedArgs } = inObj

      // Help
      if (parsedArgs.help) {
        const outMsg = (
          <span>
            <strong>wallet_balance:</strong><br />
            <p>
              Check the BCH and SLP token balance of the wallet.
            </p>
          </span>
        )

        return { outMsg }
      }

      // Reinitialize the wallet to update any balances.
      await wallet.initialize()

      // Loop through each BCH UTXO and add up the balance.
      // This ensure that the dust used to represent tokens do not show up in
      // the BCH balance.
      let satBalance = 0
      for (let i = 0; i < wallet.utxos.utxoStore.bchUtxos.length; i++) {
        const thisUtxo = wallet.utxos.utxoStore.bchUtxos[i]

        satBalance += thisUtxo.value
      }
      const bchBalance = wallet.bchjs.BitcoinCash.toBitcoinCash(
        satBalance
      )

      // Combine token UTXOs
      const tokenUtxos = wallet.utxos.utxoStore.slpUtxos.type1.tokens.concat(
        wallet.utxos.utxoStore.slpUtxos.group.tokens,
        wallet.utxos.utxoStore.slpUtxos.nft.tokens
      )
      // console.log('tokenUtxos: ', tokenUtxos)

      // ToDo: Combine balances of UTXO with the same token ID.

      // Create a line of JSX to represent each token.
      const tokenStr = []
      for (let i = 0; i < tokenUtxos.length; i++) {
        const thisToken = tokenUtxos[i]
        // tokenStr += `${thisToken.ticker} ${thisToken.tokenQty}`
        tokenStr.push(<span>{thisToken.ticker} {thisToken.tokenQty} {thisToken.tokenId}<br /></span>)
      }

      // ToDo: Display minting batons for Group and Fungible tokens

      const outMsg = (
        <span>
          <p>
            BCH balance: {bchBalance}, in sats: {satBalance} <br />
            SLP tokens: <br />
            {tokenStr}
          </p>
        </span>
      )

      return { outMsg }
    } catch (err) {
      console.error('Error in getWalletBalance(): ', err)
      return { outMsg: `Error: ${err.message}` }
    }
  }
}

export default WalletBalance
