/*
  This is an SPA that creates a template for future BCH web3 apps.
*/

// Global npm libraries
import React, { useState, useEffect } from 'react'
import { useQueryParam, StringParam } from 'use-query-params'

// Local libraries
import './App.css'
import LoadScripts from './components/load-scripts'
import WaitingModal from './components/waiting-modal'
import AsyncLoad from './services/async-load'
import SelectServerButton from './components/servers/select-server-button'
import Footer from './components/footer'
import NavMenu from './components/nav-menu'
import AppBody from './components/app-body'

// Default alternative servers.
const defaultServerOptions = [
  { value: 'https://free-bch.fullstack.cash', label: 'https://free-bch.fullstack.cash' },
  { value: 'https://bc01-ca-bch-consumer.fullstackcash.nl', label: 'https://bc01-ca-bch-consumer.fullstackcash.nl' },
  { value: 'https://pdx01-usa-bch-consumer.fullstackcash.nl', label: 'https://pdx01-usa-bch-consumer.fullstackcash.nl' },
  { value: 'https://wa-usa-bch-consumer.fullstackcash.nl', label: 'https://wa-usa-bch-consumer.fullstackcash.nl' }
]

// let _this

function App (props) {
  // BEGIN STATE

  // Get the CashStack URL from a query parameter, if it exists.
  let [restURL] = useQueryParam('restURL', StringParam)
  // Otherwise default to free-bch.fullstack.cash
  if (!restURL) restURL = 'https://free-bch.fullstack.cash'
  // console.log('restURL: ', restURL)
  const [serverUrl, setServerUrl] = useState(restURL)

  const [menuState, setMenuState] = useState(0)
  const [wallet, setWallet] = useState(false)
  const [servers, setServers] = useState(defaultServerOptions)

  // Startup state
  // When the page is loaded, it goes through a series of async network calls
  // to initialize the app. These variables track the state of this startup
  // process.
  const [asyncInitStarted, setAsyncInitStarted] = useState(false)
  const [asyncInitFinished, setAsyncInitFinished] = useState(false)
  const [asyncInitSucceeded, setAsyncInitSucceeded] = useState(null)

  // Startup Modal
  const [showStartModal, setShowStartModal] = useState(true)
  const [modalBody, setModalBody] = useState([])
  const [hideSpinner, setHideSpinner] = useState(false)
  const [denyClose, setDenyClose] = useState(false)

  // Load all the app state into a single object that can be passed to child
  // components.
  const appData = {
    wallet,
    setWallet,
    serverUrl,
    setServerUrl,
    servers,
    setServers,
    showStartModal,
    setShowStartModal,
    menuState,
    setMenuState,
    asyncInitFinished,
    setAsyncInitFinished,
    asyncInitSucceeded,
    setAsyncInitSucceeded,
    modalBody,
    setModalBody,
    hideSpinner,
    setHideSpinner,
    denyClose,
    setDenyClose
  }

  // END STATE

  // Encasulate dependencies
  const asyncLoad = new AsyncLoad()

  useEffect(() => {
    async function asyncEffect () {
      // console.log('asyncInitStarted: ', asyncInitStarted)
      if (!asyncInitStarted) {
        try {
          setAsyncInitStarted(true)

          addToModal('Loading minimal-slp-wallet', appData)

          setDenyClose(true)

          await asyncLoad.loadWalletLib()
          // console.log('Wallet: ', Wallet)

          addToModal('Getting alternative servers', appData)
          const gistServers = await asyncLoad.getServers()
          setServers(gistServers)
          // console.log('servers: ', servers)

          // throw new Error('test error')

          addToModal('Initializing wallet', appData)
          console.log(`Initializing wallet with back end server ${serverUrl}`)

          const walletTemp = await asyncLoad.initWallet(serverUrl)
          setWallet(walletTemp)

          // Update state
          setShowStartModal(false)
          setDenyClose(false)

          // Update the startup state.
          setAsyncInitFinished(true)
          setAsyncInitSucceeded(true)
          console.log('App.js useEffect() startup finished successfully')
        } catch (err) {
          const errModalBody = [
            `Error: ${err.message}`,
            'Try selecting a different back end server using the drop-down menu at the bottom of the app.'
          ]
          setModalBody(errModalBody)

          // Update Modal State
          setHideSpinner(true)
          setShowStartModal(true)
          setDenyClose(false)

          // Update the startup state.
          setAsyncInitFinished(true)
          setAsyncInitSucceeded(false)
        }
      }
    }
    asyncEffect()
  })

  return (
    <>
      <LoadScripts />
      <NavMenu menuHandler={onMenuClick} appData={appData} />

      {
        showStartModal
          ? (<UninitializedView appData={appData} />)
          : (<InitializedView menuState={menuState} appData={appData} />)
      }

      <SelectServerButton menuHandler={onMenuClick} appData={appData} />
      <Footer appData={appData} />
    </>
  )
}

// Add a new line to the waiting modal.
function addToModal (inStr, appData) {
  // console.log('addToModal() inStr: ', inStr)

  appData.setModalBody(prevBody => {
    // console.log('prevBody: ', prevBody)
    prevBody.push(inStr)
    return prevBody
  })
}

// This handler is passed into the child menu component. When an item in the
// nav menu is clicked, this handler will update the state. The state is
// used by the AppBody component to determine which View component to display.
function onMenuClick (menuState, appData) {
  // console.log('onMenuClick() menuState: ', menuState)

  appData.setMenuState(menuState)
}

// This is rendered *before* the BCH wallet is initialized.
function UninitializedView (props = {}) {
  // console.log('UninitializedView props: ', props)

  const heading = 'Connecting to BCH blockchain...'

  return (
    <>
      <WaitingModal
        heading={heading}
        body={props.appData.modalBody}
        hideSpinner={props.appData.hideSpinner}
        denyClose={props.appData.denyClose}
      />
      {
        props.asyncInitFinished
          ? <AppBody menuState={100} wallet={props.appData.wallet} appData={props.appData} />
          : null
      }
    </>
  )
}

// This is rendered *after* the BCH wallet is initialized.
function InitializedView (props) {
  return (
    <>
      <br />
      <AppBody menuState={props.menuState} appData={props.appData} />
    </>
  )
}

export default App
