/*
  This file routes commands to the appropriate handler.
*/

// Local libraries
import WalletInfo from './commands/wallet-info.js'

class CommandRouter {
  constructor () {
    this.walletInfo = new WalletInfo()
  }

  routeCommand (inObj) {
    try {
      const { cmdStr, args, appData } = inObj

      // Parse arguments
      let parsedArgs = {}
      if (args) {
        // https://stackoverflow.com/questions/74727092/fast-way-to-parse-arguments-from-string-in-javascript
        [...parsedArgs] = args.split(' ')
        parsedArgs = Object.fromEntries(parsedArgs.map(arg => arg.split('=')))
      }

      if (cmdStr === 'wallet_info') {
        return this.walletInfo.getWalletInfo({ appData })
      }

      if (cmdStr === 'wallet_import_mnemonic') {
        return `parsedArgs: ${JSON.stringify(parsedArgs, null, 2)}`
      }

      // Default value
      return 'Command not found'
    } catch (err) {
      console.error('Error in routeCommand()')
      throw err
    }
  }
}

export default CommandRouter
