/*
  This file routes commands to the appropriate handler.
*/

// Local libraries
import WalletInfo from './commands/wallet-info.js'
import WalletIndex from './commands/wallet-index.js'

class CommandRouter {
  constructor () {
    this.walletInfo = new WalletInfo()
    this.walletIndex = new WalletIndex()

    // Bind 'this' object to all subfunctions
    this.routeCommand = this.routeCommand.bind(this)
    this.parseArgs = this.parseArgs.bind(this)
  }

  async routeCommand (inObj) {
    try {
      const { cmdStr, args, termUtils } = inObj
      let { wallet } = inObj

      // Parse arguments
      const parsedArgs = this.parseArgs(args)

      if (cmdStr === 'wallet_info') {
        const {outMsg} = this.walletInfo.getWalletInfo({ wallet, parsedArgs })
        return outMsg
      }

      if (cmdStr === 'wallet_index') {
        const {outMsg} = await this.walletIndex.changeWalletIndex({wallet, parsedArgs, termUtils})
        return outMsg
      }

      // Default value
      return 'Command not found'
    } catch (err) {
      console.error('Error in routeCommand()')
      throw err
    }
  }

  parseArgs(args) {
    let parsedArgs = {}

    if (args) {
      if (args.includes('help')) {
        parsedArgs = { help: true }
      } else {
        // https://stackoverflow.com/questions/74727092/fast-way-to-parse-arguments-from-string-in-javascript
        [...parsedArgs] = args.split(' ')
        parsedArgs = Object.fromEntries(parsedArgs.map(arg => arg.split('=')))
      }
    }

    return parsedArgs
  }
}

export default CommandRouter
