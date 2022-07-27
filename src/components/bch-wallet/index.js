/*
  This component controlls the Wallet View.
*/

// Global npm libraries
import React from 'react'

class BchWallet extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      bchWallet: props.bchWallet
    }
  }

  render () {
    return (<>Placeholder</>)
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
