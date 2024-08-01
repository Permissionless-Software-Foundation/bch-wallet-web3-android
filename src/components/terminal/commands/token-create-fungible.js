/*
  This command is used to generate a Type 1 fungible SLP token.
*/

// import { Buffer } from 'buffer/'

// Local libraries
// import config from '../../../../config'

class TokenCreateFungible {
  async createType1 (inObj = {}) {
    try {
      const { wallet, parsedArgs } = inObj
      const { ticker, tokenName, decimals, qty, url, hash } = parsedArgs

      // For now no baton
      const baton = null

      // Help
      if (parsedArgs.help) {
        const outMsg = (
          <span>
            <strong>token_create_fungible:</strong><br />
            <p>
              This command is used to create a new{' '}
              <a
                href='https://github.com/simpleledger/slp-specifications/blob/master/slp-token-type-1.md'
                target='_blank' rel='noreferrer'
              >Type 1 (fungible) SLP token
              </a>. A 'simple NFT'
              can be created by setting the <code>qty</code> argument to 1 and
              the <code>decimals</code> property set to 0.
            </p>
            <br /><br />
            <strong>Arguments:</strong><br />
            <ul>
              <li><i>ticker</i> - The ticker symbol associated with the token. Usually 3-4 characters.</li><br />
              <li><i>tokenName</i> - The name of the token</li><br />
              <li><i>qty</i> - The quantity of tokens to create.</li><br />
              <li><i>decimals</i> - Divisibility of the tokens. Can be 0 to 10. 0 = non-divisible (NFT). Bitcoin uses 8. USD uses 2. Recommended value: 0-2</li><br />
              <li><i>url</i> - (optional) A website or URL associated with the token. Used by PS002 to set immutable data.</li><br />
              <li><i>hash</i> - (optional) a transaction hash. Used by PS002 to set mutable data.</li><br />

            </ul>
            <br /><br />
            <strong>Example usage:</strong><br />
            <code>
              token_create_fungible ticker=TEST tokenName=ThisIsATest qty=10 decimals=0
            </code>
          </span>
        )
        // <li><i>baton</i> - (optional) an address to send minting baton, which allows minting of additional tokens. If not specified no minting baton is created, making a fixed quantity token.</li><br />

        return { outMsg }
      }

      // Input Validation
      if (!ticker) {
        return { outMsg: `ticker argument is required. You entered: ${ticker}` }
      }
      if (!tokenName) {
        return { outMsg: `tokenName argument is required. You entered: ${tokenName}` }
      }
      if (!decimals) {
        return { outMsg: `decimals argument is required. You entered: ${decimals}` }
      }
      if (decimals > 10) {
        return { outMsg: `decimals argument is out of range. Must be 0 to 10. You entered: ${decimals}` }
      }
      if (!qty) {
        return { outMsg: `qty argument is required. You entered: ${qty}` }
      }

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

      // Set the transaction fee. Manually set for ease of example.
      const txFee = 550

      // amount to send back to the sending address.
      // Subtract two dust transactions for minting baton and tokens.
      const remainder = originalAmount - 546 * 2 - txFee

      // Determine minting baton
      let mintBaton = null // Default is burn mint baton
      if (baton) mintBaton = 2 // 2nd output of tx

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
        decimals,
        initialQty: qty,
        documentHash,
        mintBatonVout: mintBaton
      }

      // Generate the OP_RETURN entry for an SLP GENESIS transaction.
      const script = bchjs.SLP.TokenType1.generateGenesisOpReturn(configObj)

      // OP_RETURN needs to be the first output in the transaction.
      transactionBuilder.addOutput(script, 0)

      // Send dust transaction representing the tokens.
      const cashAddress = wallet.walletInfo.cashAddress
      transactionBuilder.addOutput(
        bchjs.Address.toLegacyAddress(cashAddress),
        546
      )

      // Send dust transaction representing minting baton.
      if (mintBaton) {
        transactionBuilder.addOutput(
          bchjs.Address.toLegacyAddress(cashAddress),
          546
        )
      }

      // add output to send BCH remainder of UTXO.
      transactionBuilder.addOutput(cashAddress, remainder)

      // Generate a keypair from the change address.
      // const keyPair = bchjs.HDNode.toKeyPair(change)
      const keyPair = bchjs.ECPair.fromWIF(wallet.walletInfo.privateKey)

      // Sign the transaction with the HD node.
      let redeemScript
      transactionBuilder.sign(
        0,
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
      const tokenId = await wallet.broadcast({ hex })

      const explorerLink = `https://token.fullstack.cash/?tokenid=${tokenId}`

      const outMsg = (
        <span>
          <p>
            New token created with this token ID:<br />
            <a href={explorerLink} rel='noreferrer'>{tokenId}</a>
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

export default TokenCreateFungible
