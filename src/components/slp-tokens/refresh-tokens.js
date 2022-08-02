/*
  This component is displayed as a button. When clicked, it displays a modal
  with a spinny gif, while the wallets SLP token list is updated from the
  blockchain and psf-slp-indexer.
*/

// Global npm libraries
import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

// Local libraries
import WaitingModal from '../waiting-modal'

let _this

class RefreshTokenBalance extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData,
      shouldTokensBeRefreshed: props.shouldTokensBeRefreshed,
      modalBody: [],
      hideSpinner: false,
      hideWaitingModal: true
    }

    _this = this
  }

  render () {
    return (
      <>
        <Button variant='success' onClick={this.handleRefreshBalance}>
          <FontAwesomeIcon icon={faRedo} size='lg' /> Refresh
        </Button>

        {
          this.state.hideWaitingModal
            ? null
            : (<WaitingModal heading='Refreshing Token List' body={this.state.modalBody} hideSpinner={this.state.hideSpinner} />)
        }
      </>
    )
  }

  // Update the balance of the wallet.
  async handleRefreshBalance () {
    try {
      // Throw up the waiting modal
      _this.setState({ hideWaitingModal: false })

      _this.addToModal('Updating token balance...')

      // Get handles on app data.
      const walletState = _this.state.appData.bchWalletState
      const wallet = _this.state.appData.bchWallet

      // Update the wallet UTXOs
      const tokenList = await wallet.listTokens()

      // Update the wallet state.
      walletState.slpTokens = tokenList
      _this.state.appData.updateBchWalletState(walletState)

      // Hide waiting modal
      _this.setState({ hideWaitingModal: true })
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

export default RefreshTokenBalance
