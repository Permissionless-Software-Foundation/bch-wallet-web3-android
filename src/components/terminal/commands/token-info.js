/*
  This command downloads data about an SLP token from psf-slp-indexer.
  If the token follows PS007 then the mutable and immutable data for
  the token will also be retrieved from the PSFFPP.

  PS007:
  https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps007-token-data-schema.md
*/

class TokenInfo {
  constructor () {
    // Bind 'this' object to all subfunctions
    this.getTokenInfo = this.getTokenInfo.bind(this)
    this.getIpfsData = this.getIpfsData.bind(this)
  }

  async getTokenInfo (inObj = {}) {
    try {
      const { wallet, parsedArgs } = inObj
      const { tokenId } = parsedArgs

      // Help
      if (parsedArgs.help) {
        const outMsg = (
          <span>
            <strong>token_info:</strong><br />
            <p>
              Given a token ID, retrieve genesis token info. If the token adhears
              to the PS007 standard for data, then the mutable and immutable
              data is retrieved.
            </p><br /><br />
            <strong>Arguments:</strong><br />
            <ul>
              <li><i>tokenId</i> - The unique ID of the token. Example: tokenId=210b7a99252216be78d498368cd84d980057a5cb4404739917adcc0af4b61bda</li>
            </ul>
          </span>
        )

        return { outMsg }
      }

      if (!tokenId) {
        return { outMsg: 'tokenId required. Example: token_info tokenId=c9c425f2c6352697c6665a53e035cbad8a44c4b1e36491a1838dc4655479aa09' }
      }

      // Get the genesis data.
      const tokenData = await wallet.getTokenData(tokenId)
      console.log('tokenData: ', tokenData)

      // Get the mutable data if it exists in the token data.
      let mutableData = null
      if (tokenData.mutableData) {
        mutableData = await this.getIpfsData(tokenData.mutableData)
      }

      // Get the immutable data if it exists in the token data.
      let immutableData = null
      if (tokenData.immutableData) {
        immutableData = await this.getIpfsData(tokenData.immutableData)
      }

      // Format genesis data for output to the terminal.
      const tokenInfoStr = JSON.stringify(tokenData, null, 2)
      const tokenInfoAry = tokenInfoStr.split('\n')
      console.log('tokenInfoAry: ', tokenInfoAry)
      const jsxAry = []
      for (let i = 0; i < tokenInfoAry.length; i++) {
        jsxAry.push(<span>{tokenInfoAry[i]}<br /></span>)
      }
      // console.log('jsxAry: ', jsxAry)

      // Format the mutable data for the terminal.
      if (mutableData) {
        const mutableStr = JSON.stringify(mutableData, null, 2)
        const mutableAry = mutableStr.split('\n')
        jsxAry.push(<span><br /><br /><b>Mutable Data:</b></span>)
        for (let i = 0; i < mutableAry.length; i++) {
          jsxAry.push(<span>{mutableAry[i]}<br /></span>)
        }
      }

      // Format the immutable data for the terminal.
      if (immutableData) {
        const immutableStr = JSON.stringify(immutableData, null, 2)
        const immutableAry = immutableStr.split('\n')
        jsxAry.push(<span><br /><br /><b>Immutable Data:</b></span>)
        for (let i = 0; i < immutableAry.length; i++) {
          jsxAry.push(<span>{immutableAry[i]}<br /></span>)
        }
      }

      return { outMsg: jsxAry }
    } catch (err) {
      console.error('Error in getTokenInfo(): ', err)
      return { outMsg: `Error: ${err.message}` }
    }
  }

  // Retrieve IPFS data from a PSFFPP node.
  async getIpfsData (ipfsUri) {
    try {
      if (!ipfsUri.includes('ipfs://')) { return 'not available' }

      const ipfsCid = ipfsUri.slice(7)

      // const url = `https://files.tokentiger.com/ipfs/download/${ipfsCid}/data.json`
      const url = `https://pin.fullstack.cash/ipfs/download/${ipfsCid}/data.json`

      const response = await fetch(url)
      const ipfsData = await response.json()

      return ipfsData
    } catch (err) {
      return {
        message: `Could not download this CID: ${ipfsUri}`
      }
    }
  }
}

export default TokenInfo
