/*
  This component is displayed as a button. When clicks, it displays a modal
  with a spinny gif, while the balance is updated.
*/

// Global npm libraries
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

// Local libraries
import WaitingModal from '../waiting-modal'

function RefreshBchBalance (props) {
  // Dependency injections of props
  const appData = props.appData

  // State
  const [modalBody, setModalBody] = useState([])
  const [hideSpinner, setHideSpinner] = useState(false)
  const [hideWaitingModal, setHideWaitingModal] = useState(true)

  // Create an state object for this component that gets passed to the subfunctions.
  const refreshBchData = {
    modalBody,
    setModalBody,
    hideSpinner,
    setHideSpinner,
    hideWaitingModal,
    setHideWaitingModal
  }

  return (
    <>
      <Button variant='success' onClick={(e) => handleRefreshBalance({ appData, refreshBchData })}>
        <FontAwesomeIcon icon={faRedo} size='lg' /> Refresh
      </Button>

      {
        hideWaitingModal
          ? null
          : (<WaitingModal
              heading='Refreshing BCH Balance'
              body={refreshBchData.modalBody}
              hideSpinner={refreshBchData.hideSpinner}
             />)
      }
    </>
  )
}

// Update the balance of the wallet.
async function handleRefreshBalance (inObj = {}) {
  // Dependency injection
  const { appData, refreshBchData } = inObj

  try {
    // Throw up the waiting modal
    refreshBchData.setHideWaitingModal(false)

    addToModal('Updating wallet balance...', refreshBchData)

    // Get handles on app data.
    const walletState = appData.bchWalletState
    const cashAddr = appData.bchWalletState.cashAddress
    const wallet = appData.wallet

    // Get the latest balance of the wallet.
    const newBalance = await wallet.getBalance(cashAddr)

    addToModal('Updating BCH per USD price...', refreshBchData)
    const bchUsdPrice = await wallet.getUsd()

    // Update the wallet state.
    walletState.bchBalance = newBalance
    walletState.bchUsdPrice = bchUsdPrice
    appData.updateBchWalletState({ walletState, appData })

    // Hide waiting modal
    refreshBchData.setHideWaitingModal(true)
    refreshBchData.setModalBody([])
  } catch (err) {
    console.error('Error while trying to update BCH balance: ', err)

    refreshBchData.setModalBody([`Error: ${err.message}`])
    refreshBchData.setHideSpinner(true)
  }
}

// Add a new line to the waiting modal.
function addToModal (inStr, refreshBchData) {
  refreshBchData.setModalBody(prevBody => {
    prevBody.push(inStr)
    return prevBody
  })
}

export default RefreshBchBalance
