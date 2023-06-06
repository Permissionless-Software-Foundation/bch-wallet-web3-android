/*
  This library exports a RefreshBalance functional Component and a
  refreshBalance() function.
  The RefreshBalance Component is rendered as a hidden Waiting modal.
  When the refreshBalance() function is called, it causes the modal to
  appear while the wallet balance is updated. Once updated, the modal is hidden
  again.
*/

// Global npm libraries
import React, { useState } from 'react'

// Local libraries
import WaitingModal from '../waiting-modal'

export function RefreshBchBalance (props) {
  // Dependency injections of props
  // getRefreshBchData() is a function passed in from the parent component.
  const getRefreshBchData = props.getRefreshBchData

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

  getRefreshBchData(refreshBchData)

  return (
    <>
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
export async function handleRefreshBalance (inObj = {}) {
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
    const newBalance = await wallet.getBalance({bchAddress: cashAddr})

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
