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
      let { wallet } = inObj

      // Parse arguments
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

      if (cmdStr === 'wallet_info') {
        if (parsedArgs.help) {
          return (
            <span>
              <strong>wallet_info:</strong><br />
              <p>
                Display information about the wallet, including the HD path.
                Use the <i>wallet_index</i> command to change the wallet to a
                different HD path. This command will reflect the changed
                address of the wallet.
              </p>
            </span>
          )
        }

        return this.walletInfo.getWalletInfo({ wallet })
      }

      if (cmdStr === 'wallet_index') {
        const index = parsedArgs.index

        if (parsedArgs.help) {
          return (
            <span>
              <strong>wallet_index:</strong><br />
              <p>
                A mnemonic is a 'key ring' capable of generating millions of
                key pairs. While the web wallet only uses the first key pair,
                this command can be used to change the wallet in the terminal
                to use the other key pairs available.
              </p>
              <p>
                Calling this command without an argument will display the
                current index of the HD path used by the wallet.
              </p>
              <p>
                Change the index used by the wallet by passing <i>index=2</i> (or
                some number other than 2) as an argument.
              </p>
            </span>
          )
        }

        // If index is not specified, display the current index of the wallet
        if (!index && index !== 0) {
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
