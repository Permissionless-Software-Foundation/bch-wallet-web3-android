/*
  This command generates a Pin Claim used to pin data to the PSFFPP network.

  Learn more about PSFFPP:
  https://psffpp.com

  You'll need a CID for a file. You can upload a file and get its CID here:
  https://file-stage.fullstack.cash/app

  With that CID you can use this command to generate a pin claim. This will
  cause all the PSFFPP nodes to download the file from the file stager and
  pin it on their local hard drives, making the file redundently available
  across the internet.
*/

import { Buffer } from 'buffer/'

// Local libraries
// import config from '../../../../config'

class PsffppPin {
  async pinCid (inObj = {}) {
    try {
      const { wallet, parsedArgs } = inObj
      const { cid, filename, filesize } = parsedArgs

      // Help
      if (parsedArgs.help) {
        const outMsg = (
          <span>
            <strong>psffpp_pin:</strong><br />
            <p>
              A CID is a Content IDentifier, and is used to represent files on
              the IPFS network. You can upload a file and get a CID for it
              at <a href='https://file-stage.fullstack.cash/app' target='_blank' rel='noreferrer'>
                file-stage.fullstack.cash
              </a>.
            </p>
            <p>
              Given a CID, this command will generate
              a <a href='https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps010-file-pinning-protocol.md#pin-claim' target='_blank' rel='noreferrer'>Pin Claim</a>.
              All nodes in the <a href='https://psffpp.com' target='_blank' rel='noreferrer'>PSFFPP network</a> will
              detect the Pin Claim, validate it, and pin the file, making it
              widely distributed on the internet for at least a year. The CID
              can be pinned again to renew the hosting after a year.
            </p>
            <p>
              Files up to 100MB are supported by the PSFFPP protocol. If your file
              if under 1MB, you do not need to inclue the filesize. Otherwise,
              use the <i>filesize</i> argument to include the files size
              in <b>bytes</b>.
            </p>
            <br /><br />
            <strong>Arguments:</strong><br />
            <ul>
              <li><i>cid</i> - The Content IDentifier for a file. Example: CID=bafkreih7n2266ttdtlh4cgddxaog33mtvmicf5vluulcqtom5haxdzndc4</li><br />
              <li><i>filename</i> - The filename (including extension) you want associated with the CID.</li><br />
              <li><i>filesize</i> - (optional) if the file is over 1MB in size, give the files size in bytes. This will be used to calculate the cost in PSF tokens to pin the file.</li>
            </ul>
          </span>
        )

        return { outMsg }
      }

      console.log('cid: ', cid)

      const psfPrice = await this.getWritePrice({ wallet })

      // Calculate the write price.
      let writePrice
      if (!filesize) {
        // User did not provide a filesize argument, so assume file size is 1MB
        // or less.
        writePrice = psfPrice
      } else {
        // User provided filesize argument.

        // Calculate size in MB.
        const sizeInMb = parseInt(filesize) / 1000000

        if (sizeInMb < 1) {
          // If less than 1MB, use the default write price.
          writePrice = psfPrice
        } else {
          // If over 1MB, calculate the amount of tokens that need to be burned.
          writePrice = Math.ceil(sizeInMb) * psfPrice
        }
      }

      if(!writePrice) {
        throw new Error(`writePrice has a value of ${writePrice}`)
      }

      // Ensure the write price only has 8 decimal places.
      const bchjs = wallet.bchjs
      writePrice = bchjs.Util.floor8(writePrice)

      console.log('pinCid() writePrice: ', writePrice)

      const { pobTxid, claimTxid } = await this.buildPinClaimTx({
        wallet,
        writePrice,
        filename,
        cid
      })

      const outMsg = (
        <span>
          <p>Write Price: {writePrice}</p>
          <p>Proof of Burn TXID: {pobTxid}</p>
          <p>Pin Claim: {claimTxid}</p>
        </span>
      )

      return { outMsg }
    } catch (err) {
      console.error('Error in pinCid(): ', err)
      return { outMsg: `Error: ${err.message}` }
    }
  }

  // Get the PSFFPP write price for pinning 1MB of data to the pinning cluster.
  // This data is retrieved from ipfs-bch-wallet-consumer.
  async getWritePrice (inObj = {}) {
    try {
      const { wallet } = inObj
      console.log('wallet: ', wallet)

      const server = wallet.advancedOptions.restURL

      const url = `${server}/price/psffpp`

      const response = await fetch(url)
      const writePrice = await response.json()
      console.log('getWritePrice() writePrice: ', writePrice)

      return writePrice.psfPrice

      // return 0.1
    } catch (err) {
      console.error('Error in getWritePrice()')
      throw err
    }
  }

  // This code builds a Pin Claim transaction as per PS010 specification:
  // https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps010-file-pinning-protocol.md
  async buildPinClaimTx (inObj = {}) {
    try {
      const { wallet, writePrice, filename, cid } = inObj
      const bchjs = wallet.bchjs

      // Token ID for the PSF token.
      const PSF_TOKEN_ID = '38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0'

      await wallet.initialize() // Get up-to-date UTXOs.

      // Get info and libraries from the wallet.
      const addr = wallet.walletInfo.address
      const wif = wallet.walletInfo.privateKey

      // Proof-of-Burn TXID
      const pobTxid = await wallet.burnTokens(writePrice, PSF_TOKEN_ID)
      console.log('pobTxid: ', pobTxid)

      // Wait for the indexer to update before get utxos.
      await bchjs.Util.sleep(6000)

      // Get a UTXO to spend to generate the pin claim TX.
      let utxos = await wallet.getUtxos()
      utxos = utxos.bchUtxos
      const utxo = bchjs.Utxo.findBiggestUtxo(utxos)

      // instance of transaction builder
      const transactionBuilder = new bchjs.TransactionBuilder()

      const originalAmount = utxo.value
      const vout = utxo.tx_pos
      const txid = utxo.tx_hash

      // add input with txid and index of vout
      transactionBuilder.addInput(txid, vout)

      // TODO: Compute the 1 sat/byte fee.
      const fee = 500

      // BEGIN - Construction of OP_RETURN transaction.

      // Add the OP_RETURN to the transaction.
      const script = [
        bchjs.Script.opcodes.OP_RETURN,
        Buffer.from('00510000', 'hex'),
        Buffer.from(pobTxid, 'hex'),
        Buffer.from(cid),
        Buffer.from(filename)
      ]

      // Compile the script array into a bitcoin-compliant hex encoded string.
      const data = bchjs.Script.encode(script)

      // Add the OP_RETURN output.
      transactionBuilder.addOutput(data, 0)

      // END - Construction of OP_RETURN transaction.

      // Send the same amount - fee.
      transactionBuilder.addOutput(addr, originalAmount - fee)

      // Create an EC Key Pair from the user-supplied WIF.
      const ecPair = bchjs.ECPair.fromWIF(wif)

      // Sign the transaction with the HD node.
      let redeemScript
      transactionBuilder.sign(
        0,
        ecPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        originalAmount
      )

      // build tx
      const tx = transactionBuilder.build()

      // output rawhex
      const hex = tx.toHex().toString()
      // console.log(`TX hex: ${hex}`)

      // Broadcast transation to the network
      const claimTxid = await wallet.broadcast({ hex })
      // console.log(`Claim Transaction ID: ${claimTxid}`)
      // console.log(`https://blockchair.com/bitcoin-cash/transaction/${claimTxid}`)

      return {
        pobTxid,
        claimTxid
      }
    } catch (err) {
      console.error('Error in buildPinClaimTx()')
      throw err
    }
  }
}

export default PsffppPin
