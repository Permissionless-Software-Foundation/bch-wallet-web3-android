/*
  This command is used to generate a Type 1 fungible SLP token.
*/

import { Buffer } from 'buffer/'

// Local libraries
// import config from '../../../../config'

class TokenCreateFungible {
  async createType1 (inObj = {}) {
    try {
      const { wallet, parsedArgs } = inObj
      const { ticker, tokenName, decimals, qty, url, hash, baton } = parsedArgs

      // Help
      if (parsedArgs.help) {
        const outMsg = (
          <span>
            <strong>token_create_fungible:</strong><br />
            <p>
              This command is used to create a new <a href="https://github.com/simpleledger/slp-specifications/blob/master/slp-token-type-1.md"
              target="_blank">Type 1 (fungible) SLP token</a>. A 'simple NFT'
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
              <li><i>baton</i> - (optional) an address to send minting baton, which allows minting of additional tokens. If not specified no minting baton is created, making a fixed quantity token.</li><br />
            </ul>
            <br /><br />
            <strong>Example usage:</strong><br />
            <code>
              token_create_fungible ticker=TEST tokenName=ThisIsATest qty=10 decimals=0
            </code>
          </span>
        )

        return { outMsg }
      }

      if(!ticker) {
        return { outMsg: `ticker argument is required. You entered: ${ticker}` }
      }

      if(!tokenName) {
        return { outMsg: `tokenName argument is required. You entered: ${tokenName}` }
      }

      if(!decimals) {
        return { outMsg: `decimals argument is required. You entered: ${decimals}` }
      }
      if(decimals > 10) {
        return { outMsg: `decimals argument is out of range. Must be 0 to 10. You entered: ${decimals}` }
      }

      if(!qty) {
        return { outMsg: `qty argument is required. You entered: ${qty}` }
      }

      const bchjs = wallet.bchjs



      const outMsg = (
        <span>
          <p>
            MDA TXID:
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
