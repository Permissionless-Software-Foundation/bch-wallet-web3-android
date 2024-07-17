/*
  This file routes commands to the appropriate handler.
*/

// Local libraries
import WalletInfo from './commands/wallet-info.js'

class CommandRouter {
  constructor () {
    this.walletInfo = new WalletInfo()
  }

  async routeCommand (inObj) {
    try {
      const { cmdStr, args, termUtils } = inObj
      let {wallet} = inObj

      // Parse arguments
      let parsedArgs = {}
      if (args) {
        // https://stackoverflow.com/questions/74727092/fast-way-to-parse-arguments-from-string-in-javascript
        [...parsedArgs] = args.split(' ')
        parsedArgs = Object.fromEntries(parsedArgs.map(arg => arg.split('=')))
      }

      if (cmdStr === 'wallet_info') {
        return this.walletInfo.getWalletInfo({ wallet })
      }

      if (cmdStr === 'wallet_index') {
        let index = parsedArgs.index

        // If index is not specified, display the current index of the wallet
        if(!index && index !== 0) {
          return `HD path: ${wallet.walletInfo.hdPath}`
        }

        // If an index argument is passed, switch the wallet to that HD index.
        wallet = await termUtils.switchWallet({ index })

        return `HD path: ${wallet.walletInfo.hdPath}`
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
