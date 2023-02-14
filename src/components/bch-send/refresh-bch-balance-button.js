/*
  This component is displayed as a button. When clicked, it loads the
  RefreshBchBalance component, which renders a waiting modal while the wallet
  balance is refreshed.
*/

// Global npm libraries
import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

// Local libraries
import { RefreshBchBalance, handleRefreshBalance } from '../refresh-balance'

let refreshBchData = {}

function RefreshBchBalanceButton (props) {
  // Dependency injections of props
  const appData = props.appData

  return (
    <>
      <Button variant='success' onClick={(e) => handleButtonRefreshBalance({ appData })}>
        <FontAwesomeIcon icon={faRedo} size='lg' /> Refresh
      </Button>

      <RefreshBchBalance appData={appData} getRefreshBchData={getRefreshBchData} />
    </>
  )
}

function getRefreshBchData (newRefreshBchData) {
  refreshBchData = newRefreshBchData
}

// Update the balance of the wallet.
async function handleButtonRefreshBalance (inObj = {}) {
  // Dependency injection
  const { appData } = inObj

  handleRefreshBalance({ appData, refreshBchData })
}

export default RefreshBchBalanceButton
