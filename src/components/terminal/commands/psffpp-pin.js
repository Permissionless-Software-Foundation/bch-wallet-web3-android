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

// Global npm libraries
import PSFFPP from 'psffpp'

class PsffppPin {
  async pinCid(inObj = {}) {
    try {
      const { wallet, parsedArgs } = inObj
      const { cid } = parsedArgs

      // Help
      if (parsedArgs.help) {
        const outMsg = (
          <span>
            <strong>psffpp_pin:</strong><br />
            <p>
              A CID is a Content IDentifier, and is used to represent files on
              the IPFS network. You can upload a file and get a CID for it at
              <a href="https://file-stage.fullstack.cash" target="_blank">
              file-stage.fullstack.cash</a>.
            </p>
            <p>
              Given a CID, this command will generate
              a <a href="https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps010-file-pinning-protocol.md#pin-claim" target="_blank">Pin Claim</a>.
              All nodes in the <a href="https://psffpp.com" target="_blank">PSFFPP network</a> will
              detect the Pin Claim, validate it, and pin the file, making it
              widely distributed on the internet for at least a year. The CID
              can be pinned again to renew the hosting after a year.
            </p>
            <p>
              Right now this command assumes the file is 1MB or less. But files
              up to 100MB are supported by the PSFFPP protocol. This command
              will be updated in the future to support larger files.
            </p>
            <br /><br />
            <strong>Arguments:</strong><br />
            <ul>
              <li><i>tokenId</i> - The unique ID of the token. Example: tokenId=210b7a99252216be78d498368cd84d980057a5cb4404739917adcc0af4b61bda</li>
            </ul>
          </span>
        )

        return { outMsg }
      }

      const psffpp = new PSFFPP({wallet})

      // Get the cost to write 1MB to the PSFFPP network.
      const writePrice = await psffpp.getMcWritePrice()
      console.log('writePrice: ', writePrice)

      

    } catch(err) {
      console.error('Error in pinCid(): ', err)
      return { outMsg: `Error: ${err.message}` }
    }
  }
}

export default PsffppPin
