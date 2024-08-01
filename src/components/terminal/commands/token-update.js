/*
  This command is used to update the mutable data of a token.

  This command must be executed by the Mutable Data Address designated in
  the 'documentHash' field of the tokens Genesis data. Use the 'token_mda_tx'
  command to designate an MDA for a token.
*/

// import { Buffer } from 'buffer/'

// Local libraries
// import config from '../../../../config'
import { SlpMutableData } from 'slp-mutable-data'

class TokenUpdate {
  async updateMutableCid (inObj = {}) {
    try {
      const { wallet, parsedArgs } = inObj
      const { cid } = parsedArgs

      // Help
      if (parsedArgs.help) {
        const outMsg = (
          <span>
            <strong>token_update:</strong><br />
            <p>
              This command is used to update the mutable data of a token.
            </p>
            <p>
              This command must be executed by the Mutable Data Address designated in
              the 'documentHash' field of the tokens Genesis data. Use the
              'wallet_index' command to switch to the key pair designated as the
              MDA. Use the 'token_mda_tx' command to designate an MDA for a token.
            </p>
            <p>
              <a href='https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps002-slp-mutable-data.md' target='_blank' rel='noreferrer'>
                PS002 specification for mutable data
              </a>
            </p>
            <br /><br />
            <strong>Arguments:</strong><br />
            <ul>
              <li><i>cid</i> - IPFS CID identifying file to be the new copy of the mutable data.</li><br />
            </ul>
            <br /><br />
            <strong>Example:</strong><br />
            <code>
              token_update cid=bafkreianhou276iqniuf3ap2jsu6m65fwmtvdfzmw3fwkuj5n5wmrzfkau
            </code>
          </span>
        )

        return { outMsg }
      }

      // Input Validation
      if (!cid) {
        return { outMsg: `cid argument is required. You entered: ${cid}` }
      }

      await wallet.initialize() // Get up-to-date UTXOs.

      const slpMutableData = new SlpMutableData({ wallet })

      // Ensure TX includes a ipfs:// prefix.
      let cidStr = `ipfs://${cid}`
      if (cid.includes('ipfs://')) {
        cidStr = cid
      }
      // console.log('cidStr: ', cidStr)

      const hex = await slpMutableData.data.writeCIDToOpReturn(cidStr)

      // Broadcast transation to the network
      const updateTx = await wallet.broadcast({ hex })

      const outMsg = (
        <span>
          <p>
            Mutable Data Address now points to new mutable data with this CID:<br />
            {cid}
          </p>
          <p>
            Update TXID:<br />
            {updateTx}
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

export default TokenUpdate
