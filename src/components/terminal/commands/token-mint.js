/*
  This command is used to mint addition Type 1 (fungible) or Type 128 (group)
  tokens from a minting baton.
*/

class TokenMint {
  async mintTokens (inObj = {}) {
    try {
      const { wallet, parsedArgs } = inObj
      const { qty, tokenId, addr } = parsedArgs

      // Help
      if (parsedArgs.help) {
        const outMsg = (
          <span>
            <strong>token_mint:</strong><br />
            <p>
              Mint new Fungible (Type 1) or Group (Type 128) tokens
            </p>
            <p>
              If the wallet contains a minting baton from creating a Fungible or Group token,
              this command can be used to mint new tokens into existence.
            </p>
            <br /><br />
            <strong>Arguments:</strong><br />
            <ul>
              <li><i>qty</i> - The quantity of tokens to create.</li><br />
              <li><i>tokenId</i> - Token ID of the token to be minted</li><br />
              <li><i>addr</i> - The address to send the newly minted tokens to</li><br />
            </ul>
            <br /><br />
            <strong>Example usage:</strong><br />
            <code>
              token_mint qty=1 tokenId=fc77cc7c1f0d6519bde3f764dbd8094d341f7d6114fee2567f35260bc402ab7d
            </code>
          </span>
        )

        return { outMsg }
      }

      // Input Validation
      if (!qty) {
        return { outMsg: `qty argument is required. You entered: ${qty}` }
      }
      if (!tokenId) {
        return { outMsg: `tokenId argument is required. You entered: ${tokenId}` }
      }
      if (!addr) {
        return { outMsg: `addr argument is required. You entered: ${addr}` }
      }

      await wallet.initialize() // Get up-to-date UTXOs.
      const bchjs = wallet.bchjs

      // Get a UTXO to pay for the transaction
      const bchUtxos = wallet.utxos.utxoStore.bchUtxos
      if (bchUtxos.length === 0) throw new Error('No BCH UTXOs available to pay for transaction.')

      // Pay for the tx with the biggest UTXO in the array.
      const bchUtxo = bchjs.Utxo.findBiggestUtxo(bchUtxos)
      // console.log(`bchUtxo: ${JSON.stringify(bchUtxo, null, 2)}`)

      // instance of transaction builder
      const transactionBuilder = new bchjs.TransactionBuilder()

      const originalAmount = bchUtxo.value
      const vout = bchUtxo.tx_pos
      const txid = bchUtxo.tx_hash

      // add input with txid and index of vout
      transactionBuilder.addInput(txid, vout)

      // Get mint batons.
      const mintBatons = wallet.utxos.utxoStore.slpUtxos.type1.mintBatons.concat(
        wallet.utxos.utxoStore.slpUtxos.group.mintBatons
      )

      // Filter out the batons for the selected token.
      const filteredBatons = mintBatons.filter(x => x.tokenId === tokenId)
      if (filteredBatons.length === 0) {
        throw new Error(`A minting baton for token ID ${tokenId} could not be found in the wallet.`)
      }

      const mintBaton = filteredBatons[0]
      // console.log(`mintBaton: ${JSON.stringify(mintBaton, null, 2)}`)


      // add the mint baton as an input.
      transactionBuilder.addInput(mintBaton.tx_hash, mintBaton.tx_pos)

      // Set the transaction fee. Manually set for ease of example.
      const txFee = 550

      // amount to send back to the sending address.
      // Subtract two dust transactions for minting baton and tokens.
      const remainder = originalAmount - 546 * 2 - txFee

      // Generate the OP_RETURN entry for an SLP MINT transaction.
      let script
      if (mintBaton.tokenType === 129) {
        script = bchjs.SLP.NFT1.mintNFTGroupOpReturn([mintBaton], qty, false)
      } else {
        // tokenType === 1 (fungible token)
        script = bchjs.SLP.TokenType1.generateMintOpReturn([mintBaton], qty, false)
      }

      // OP_RETURN needs to be the first output in the transaction.
      transactionBuilder.addOutput(script, 0)

      // Send dust transaction representing the tokens.
      transactionBuilder.addOutput(
        bchjs.Address.toLegacyAddress(addr),
        546
      )

      // Send dust transaction representing minting baton.
      const cashAddress = wallet.walletInfo.cashAddress
      transactionBuilder.addOutput(
        bchjs.Address.toLegacyAddress(cashAddress),
        546
      )

      // add output to send BCH remainder of UTXO.
      transactionBuilder.addOutput(cashAddress, remainder)

      // Generate a keypair from the change address.
      // const keyPair = bchjs.HDNode.toKeyPair(change)
      const keyPair = bchjs.ECPair.fromWIF(wallet.walletInfo.privateKey)

      let redeemScript

      // Sign the transaction with the HD node.
      transactionBuilder.sign(
        0,
        keyPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        originalAmount
      )

      // Sign the second input
      transactionBuilder.sign(
        1,
        keyPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        mintBaton.value
      )

      // build tx
      const tx = transactionBuilder.build()
      // output rawhex
      const hex = tx.toHex().toString()

      // Broadcast transation to the network
      const mintTxid = await wallet.broadcast({ hex })

      const explorerLink = `https://token.fullstack.cash/transactions/?txid=${mintTxid}`

      const outMsg = (
        <span>
          <p>
            {qty} new tokens minted and sent to address {cashAddress}:<br />
            <a href={explorerLink} target='_blank' rel='noreferrer'>{mintTxid}</a>
          </p>
        </span>
      )

      return { outMsg }
    } catch (err) {
      console.error('Error in mintTokens(): ', err)
      return { outMsg: `Error: ${err.message}` }
    }
  }
}

export default TokenMint
