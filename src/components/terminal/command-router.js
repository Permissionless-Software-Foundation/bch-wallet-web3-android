/*
  This file routes commands to the appropriate handler.
*/

// Local libraries
import WalletInfo from './commands/wallet-info.js'
import WalletIndex from './commands/wallet-index.js'
import WalletBalance from './commands/wallet-balance.js'
import TokenInfo from './commands/token-info.js'
import PsffppPin from './commands/psffpp-pin.js'
import TokenMda from './commands/token-mda-tx.js'
import TokenCreateFungible from './commands/token-create-fungible.js'
import TokenUpdate from './commands/token-update.js'
import TokenCreateGroup from './commands/token-create-group.js'
import TokenCreateNft from './commands/token-create-nft.js'
import TokenMint from './commands/token-mint.js'

class CommandRouter {
  constructor () {
    this.walletInfo = new WalletInfo()
    this.walletIndex = new WalletIndex()
    this.walletBalance = new WalletBalance()
    this.tokenInfo = new TokenInfo()
    this.psffppPin = new PsffppPin()
    this.tokenMda = new TokenMda()
    this.tokenCreateFungible = new TokenCreateFungible()
    this.tokenUpdate = new TokenUpdate()
    this.tokenCreateGroup = new TokenCreateGroup()
    this.tokenCreateNft = new TokenCreateNft()
    this.tokenMint = new TokenMint()

    // Bind 'this' object to all subfunctions
    this.routeCommand = this.routeCommand.bind(this)
    this.parseArgs = this.parseArgs.bind(this)
  }

  async routeCommand (inObj) {
    try {
      const { cmdStr, args, termUtils } = inObj
      const { wallet } = inObj

      // Parse arguments
      const parsedArgs = this.parseArgs(args)

      if (cmdStr === 'wallet_info') {
        const { outMsg } = this.walletInfo.getWalletInfo({ wallet, parsedArgs })
        return outMsg
      }

      if (cmdStr === 'wallet_index') {
        const { outMsg } = await this.walletIndex.changeWalletIndex({ wallet, parsedArgs, termUtils })
        return outMsg
      }

      if (cmdStr === 'wallet_balance') {
        const { outMsg } = await this.walletBalance.getWalletBalance({ wallet, parsedArgs, termUtils })
        return outMsg
      }

      if (cmdStr === 'token_info') {
        const { outMsg } = await this.tokenInfo.getTokenInfo({ wallet, parsedArgs, termUtils })
        return outMsg
      }

      if (cmdStr === 'psffpp_pin') {
        const { outMsg } = await this.psffppPin.pinCid({ wallet, parsedArgs, termUtils })
        return outMsg
      }

      if (cmdStr === 'token_mda') {
        const { outMsg } = await this.tokenMda.createMdaTx({ wallet, parsedArgs, termUtils })
        return outMsg
      }

      if (cmdStr === 'token_create_fungible') {
        const { outMsg } = await this.tokenCreateFungible.createType1({ wallet, parsedArgs, termUtils })
        return outMsg
      }

      if (cmdStr === 'token_update') {
        const { outMsg } = await this.tokenUpdate.updateMutableCid({ wallet, parsedArgs, termUtils })
        return outMsg
      }

      if (cmdStr === 'token_create_group') {
        const { outMsg } = await this.tokenCreateGroup.createType128({ wallet, parsedArgs, termUtils })
        return outMsg
      }

      if (cmdStr === 'token_create_nft') {
        const { outMsg } = await this.tokenCreateNft.createType65({ wallet, parsedArgs, termUtils })
        return outMsg
      }

      if (cmdStr === 'token_mint') {
        const { outMsg } = await this.tokenMint.mintTokens({ wallet, parsedArgs, termUtils })
        return outMsg
      }

      // Default value
      return 'Command not found'
    } catch (err) {
      console.error('Error in routeCommand()')
      throw err
    }
  }

  parseArgs (args) {
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
