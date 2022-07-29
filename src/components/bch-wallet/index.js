/*
  This component controlls the Wallet View.
*/

// Global npm libraries
import React from 'react'

// Local Libraries
import WebWalletWarning from './warning'
import WalletSummary from './wallet-summary'
import WalletClear from './clear-wallet'

class BchWallet extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      bchWallet: props.bchWallet,
      bchWalletState: props.bchWalletState
    }
  }

  render () {
    return (
      <>
        <WebWalletWarning />
        <br />
        <WalletSummary bchWallet={this.state.bchWallet} bchWalletState={this.state.bchWalletState} />
        <br />
        <WalletClear />
      </>
    )
  }

  async componentDidMount () {
    try {
      await this.state.bchWallet.walletInfoPromise

      const bchBalance = await this.state.bchWallet.getBalance()
      console.log('bchBalance: ', bchBalance)

      this.setState({
        bchBalance
      })
    } catch (err) {
      console.error('Error in wallets.js component when trying to load BCH wallet balances: ', err)
    }
  }
}

export default BchWallet
