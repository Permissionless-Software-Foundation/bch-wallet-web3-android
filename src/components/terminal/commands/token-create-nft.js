/*
  This command is used to generate a Type 128 Group SLP token.
  These tokens are used to create NFTs (Type 65)
*/

class TokenCreateNFT {
  async createType65 (inObj = {}) {
    try {
      const { wallet, parsedArgs } = inObj
      const { ticker, tokenName, tokenId, url, hash } = parsedArgs

      // Help
      if (parsedArgs.help) {
        const outMsg = (
          <span>
            <strong>token_create_group:</strong><br />
            <p>
              This command is used to create a new{' '}
              <a
                href='https://github.com/simpleledger/slp-specifications/blob/master/slp-nft-1.md'
                target='_blank' rel='noreferrer'
              >Type 65 NFT SLP token
              </a>. This requires burning a group token to generate a type 65
              NFT token. You will need a Type 128 group token in your wallet
              first.{' '}
              <a
                href='https://github.com/Permissionless-Software-Foundation/psf-js-examples/blob/master/bch-js/bch/applications/slp/nft/README.md'
                target='_blank' rel='noreferrer'
              >Here is an explanation
              </a> of the
              relationship between group tokens and NFTs.
            </p>
            <br /><br />
            <strong>Arguments:</strong><br />
            <ul>
              <li><i>ticker</i> - The ticker symbol associated with the token. Usually 3-4 characters.</li><br />
              <li><i>tokenName</i> - The name of the token</li><br />
              <li><i>tokenId</i> - Token ID for a Group token in your wallet. This will be burned to generate the NFT.</li><br />
              <li><i>url</i> - (optional) A website or URL associated with the token. Used by PS002 to set immutable data.</li><br />
              <li><i>hash</i> - (optional) a transaction hash. Used by PS002 to set mutable data.</li><br />
            </ul>
            <br /><br />
            <strong>Example usage:</strong><br />
            <code>
              token_create_nft ticker=NFT tokenName=TestNFT tokenId=fc77cc7c1f0d6519bde3f764dbd8094d341f7d6114fee2567f35260bc402ab7d
            </code>
          </span>
        )

        return { outMsg }
      }

      // Input Validation
      if (!ticker) {
        return { outMsg: `ticker argument is required. You entered: ${ticker}` }
      }
      if (!tokenName) {
        return { outMsg: `tokenName argument is required. You entered: ${tokenName}` }
      }
      if (!tokenId) {
        return { outMsg: `tokenId argument is required. You entered: ${tokenId}` }
      }

      await wallet.initialize() // Get up-to-date UTXOs.
      const bchjs = wallet.bchjs

      // Get a UTXO to pay for the transaction
      const bchUtxos = wallet.utxos.utxoStore.bchUtxos
      if (bchUtxos.length === 0) throw new Error('No BCH UTXOs available to pay for transaction.')

      // Pay for the tx with the biggest UTXO in the array.
      const bchUtxo = bchjs.Utxo.findBiggestUtxo(bchUtxos)
      // console.log(`bchUtxo: ${JSON.stringify(bchUtxo, null, 2)}`)

      // Get a Group token UTXO
      const groupUtxos = wallet.utxos.utxoStore.slpUtxos.group.tokens.filter(x => x.tokenId === tokenId)
      if (groupUtxos.length === 0) {
        throw new Error(`Group token with token ID ${tokenId} not found in wallet.`)
      }
      const groupUtxo = groupUtxos[0]

      // instance of transaction builder
      const transactionBuilder = new bchjs.TransactionBuilder()

      const originalAmount = bchUtxo.value
      const vout = bchUtxo.tx_pos
      const txid = bchUtxo.tx_hash

      // Add Group token as first input.
      transactionBuilder.addInput(groupUtxo.tx_hash, groupUtxo.tx_pos)

      // add input with txid and index of vout
      transactionBuilder.addInput(txid, vout)

      // Set the transaction fee. Manually set for ease of example.
      const txFee = 550

      // amount to send back to the sending address.
      // Subtract two dust transactions for minting baton and tokens.
      const remainder = originalAmount - 546 * 2 - txFee

      // Determine setting for document URL
      let documentUrl = ''
      if (url) documentUrl = url

      // Determine setting for document hash
      let documentHash = ''
      if (hash) documentHash = hash

      // Generate SLP config object
      const configObj = {
        name: tokenName,
        ticker,
        documentUrl,
        documentHash
      }

      // Generate the OP_RETURN entry for an SLP GENESIS transaction.
      const script = bchjs.SLP.NFT1.generateNFTChildGenesisOpReturn(configObj)

      // OP_RETURN needs to be the first output in the transaction.
      transactionBuilder.addOutput(script, 0)

      // Send dust transaction representing the tokens.
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

      // Sign the input with the Group token.
      let redeemScript
      transactionBuilder.sign(
        0,
        keyPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        groupUtxo.value
      )

      // Sign the transaction with the HD node.
      transactionBuilder.sign(
        1,
        keyPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        originalAmount
      )

      // build tx
      const tx = transactionBuilder.build()
      // output rawhex
      const hex = tx.toHex().toString()

      // Broadcast transation to the network
      const nftTokenId = await wallet.broadcast({ hex })

      const explorerLink = `https://token.fullstack.cash/?tokenid=${nftTokenId}`

      const outMsg = (
        <span>
          <p>
            New token created with this token ID:<br />
            <a href={explorerLink} target='_blank' rel='noreferrer'>{nftTokenId}</a>
          </p>
        </span>
      )

      return { outMsg }
    } catch (err) {
      console.error('Error in type1Tx(): ', err)
      return { outMsg: `Error: ${err.message}` }
    }
  }
}

export default TokenCreateNFT
