/*
  This command is used to generate a TXID for attaching mutable data to a token.
  Given a BCH address, it generates a transaction to turn that address into
  the controller of mutable data for a token. This generates a TXID which is
  used in the tokens 'documentHash' field when creating the token.

  MDA is an acrynym for 'Mutable Data Address'

  PS002 specification for mutable data:
  https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps002-slp-mutable-data.md
*/

import { Buffer } from 'buffer/'

// Local libraries
// import config from '../../../../config'

class TokenMda {
  async createMdaTx (inObj = {}) {
    try {
      const { wallet, parsedArgs } = inObj
      const { mda } = parsedArgs

      // Help
      if (parsedArgs.help) {
        const outMsg = (
          <span>
            <strong>token_mda_tx:</strong><br />
            <p>
              Create TXID for token mutable data
            </p>
            <p>
              MDA is an acrynym for 'Mutable Data Address'
            </p>
            <p>
              This command is used to generate a TXID for attaching mutable data to a token.
              Given a BCH address, it generates a transaction to turn that address into
              the controller of mutable data for a token. This generates a TXID which is
              used in the tokens 'documentHash' field when creating the token.
            </p>
            <p>
              <a href='https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps002-slp-mutable-data.md' target='_blank' rel='noreferrer'>
                PS002 specification for mutable data
              </a>
            </p>
            <br /><br />
            <strong>Arguments:</strong><br />
            <ul>
              <li><i>mda</i> - A <i>bitcoincash:</i> address to be the Mutable Data Address (MDA)</li><br />
            </ul>
          </span>
        )

        return { outMsg }
      }

      const bchjs = wallet.bchjs

      // Get a UTXO to pay for the transaction
      const bchUtxos = wallet.utxos.utxoStore.bchUtxos
      // console.log(`bchUtxos: ${JSON.stringify(bchUtxos, null, 2)}`)
      if (bchUtxos.length === 0) {
        return { outMsg: 'No BCH UTXOs available to pay for transaction.' }
      }

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
      const dust = 546

      // amount to send back to the sending address.
      // Subtract two dust transactions for minting baton and tokens.
      const remainder = originalAmount - dust * 1 - txFee

      // Generate the OP_RETURN data
      const script = [
        bchjs.Script.opcodes.OP_RETURN,
        Buffer.from(JSON.stringify({ mda }))
      ]

      // Compile the script array into a bitcoin-compliant hex encoded string.
      const data = bchjs.Script.encode(script)

      // Add the OP_RETURN output.
      transactionBuilder.addOutput(data, 0)

      // Send dust to the MSP address to cryptographically link it to this TX.
      transactionBuilder.addOutput(mda, dust)

      // add output to send BCH remainder of UTXO.
      transactionBuilder.addOutput(wallet.walletInfo.address, remainder)

      // Generate a keypair from the change address.
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

      // Convert the transaction into a string of hex.
      const hex = tx.toHex().toString()

      // Broadcast transation to the network
      const mdaTx = await wallet.broadcast({ hex })

      const outMsg = (
        <span>
          <p>
            MDA TXID: {mdaTx}
          </p>
          <p>
            Use the above TXID in the <i>documentHash</i> field when creating
            a token. The address <i>{mda}</i> will control the mutable data for
            that token.
          </p>
        </span>
      )

      return { outMsg }
    } catch (err) {
      console.error('Error in pinCid(): ', err)
      return { outMsg: `Error: ${err.message}` }
    }
  }
}

export default TokenMda
