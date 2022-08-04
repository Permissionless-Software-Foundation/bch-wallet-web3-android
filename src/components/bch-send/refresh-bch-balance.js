/*
  This component is displayed as a button. When clicks, it displays a modal
  with a spinny gif, while the balance is updated.
*/

// Global npm libraries
import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

// Local libraries
import WaitingModal from '../waiting-modal'

// let _this

class RefreshBchBalance extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData,
      modalBody: [],
      hideSpinner: false,
      hideWaitingModal: true
    }

    // Bind the 'this' keyword to event handler
    this.handleRefreshBalance = this.handleRefreshBalance.bind(this)

    // _this = this
  }

  render () {
    // console.log(`this.state.hideWaitingModal: ${this.state.hideWaitingModal}`)

    return (
      <>
        <Button variant='success' onClick={this.handleRefreshBalance}>
          <FontAwesomeIcon icon={faRedo} size='lg' /> Refresh
        </Button>

        {
          this.state.hideWaitingModal
            ? null
            : (<WaitingModal
                heading='Refreshing BCH Balance'
                body={this.state.modalBody}
                hideSpinner={this.state.hideSpinner}
               />)
        }
      </>
    )
  }

  // Update the balance of the wallet.
  async handleRefreshBalance (event) {
    // console.log('handleRefreshBalance() event: ', event)

    try {
      // Throw up the waiting modal
      this.setState({ hideWaitingModal: false })

      this.addToModal('Updating wallet balance...')

      // Get handles on app data.
      const walletState = this.state.appData.bchWalletState
      const cashAddr = walletState.cashAddress
      const wallet = this.state.appData.bchWallet

      // Get the latest balance of the wallet.
      const newBalance = await wallet.getBalance(cashAddr)

      this.addToModal('Updating BCH per USD price...')
      const bchUsdPrice = await wallet.getUsd()

      // Update the wallet state.
      walletState.bchBalance = newBalance
      walletState.bchUsdPrice = bchUsdPrice
      this.state.appData.updateBchWalletState(walletState)

      // Hide waiting modal
      this.setState({
        hideWaitingModal: true,
        modalBody: []
      })
    } catch (err) {
      console.error('Error while trying to update BCH balance: ', err)

      this.modalBody = [`Error: ${err.message}`]

      this.setState({
        modalBody: this.modalBody,
        hideSpinner: true
      })
    }
  }

  // Add a new line to the waiting modal.
  addToModal (inStr) {
    const modalBody = this.state.modalBody

    modalBody.push(inStr)

    this.setState({
      modalBody
    })
  }
}

export default RefreshBchBalance
