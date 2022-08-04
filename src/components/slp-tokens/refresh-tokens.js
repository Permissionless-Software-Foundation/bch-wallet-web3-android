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

// let _this

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

    this.handleRefreshBalance = this.handleRefreshBalance.bind(this)

    // _this = this
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
      this.setState({ hideWaitingModal: false })

      this.addToModal('Updating token balance...')

      // Get handles on app data.
      const walletState = this.state.appData.bchWalletState
      const wallet = this.state.appData.bchWallet

      // Update the wallet UTXOs
      const tokenList = await wallet.listTokens()
      // console.log(`tokenList: ${JSON.stringify(tokenList, null, 2)}`)

      // Copy tokens from old token state.
      for (let i = 0; i < tokenList.length; i++) {
        const thisToken = tokenList[i]

        // Look through the existing wallet state for the matching token.
        const existingToken = walletState.slpTokens.filter(x => x.tokenId === thisToken.tokenId)

        // If the current wallet state has an icon, copy it over.
        if (existingToken[0] && existingToken[0].icon) {
          thisToken.icon = existingToken[0].icon
        } else {
          thisToken.icon = null
        }
      }

      // Update the wallet state.
      walletState.slpTokens = tokenList
      this.state.appData.updateBchWalletState(walletState)

      const newAppData = Object.assign({}, this.state.appData, { bchWalletState: walletState })
      // console.log(`newAppData.bchWalletState: ${JSON.stringify(newAppData.bchWalletState, null, 2)}`)

      this.setState({
        // Hide waiting modal
        hideWaitingModal: true,

        // Update the token data for this View
        appData: newAppData,

        // Wipe the modal body
        modalBody: []
      })

      return newAppData
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
