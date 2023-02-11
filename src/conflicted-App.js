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
import LoadLocalStorage from './components/load-localstorage'

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

<<<<<<< HEAD
    this.state = {
      // State specific to this top-level component.
      walletInitialized: false,
      bchWallet: false, // BCH wallet instance
      menuState: 0, // The current View being displayed in the app
      queryParamExists: false, // Becomes true if query parameters are detected in the URL.
      serverUrl, // Stores the URL for the currently selected server.
      servers: defaultServerOptions, // A list of back end servers.

      // Startup Modal
      showStartModal: true, // Should the startup modal be visible?
      asyncInitFinished: false, // Did startup finish?
      asyncInitSucceeded: null, // Did startup finish successfully?
      modalBody: [], // Strings displayed in the modal
      hideSpinner: false, // Spinner gif in modal
      denyClose: false,

      // The wallet state make this a true progressive web app (PWA). As
      // balances, UTXOs, and tokens are retrieved, this state is updated.
      // properties are enumerated here for the purpose of documentation.
      bchWalletState: {
        mnemonic: undefined,
        address: undefined,
        cashAddress: undefined,
        slpAddress: undefined,
        privateKey: undefined,
        publicKey: undefined,
        legacyAddress: undefined,
        hdPath: undefined,
        bchBalance: 0,
        slpTokens: [],
        bchUsdPrice: 150
      },

      // Will be replaced by Sweep library class once the library loads.
      Sweep: null
    }
=======
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
>>>>>>> upstream/master

  // Startup Modal
  const [showStartModal, setShowStartModal] = useState(true)
  const [modalBody, setModalBody] = useState([])
  const [hideSpinner, setHideSpinner] = useState(false)
  const [denyClose, setDenyClose] = useState(false)

<<<<<<< HEAD
    // These values are set by load-localstorage.js when it reads Local Storage.
    this.mnemonic = undefined
    this.lsState = undefined // local storage state
    this.setLSState = undefined
    this.delLSState = undefined

    // Bind the 'this' object to event handlers
    this.passMnemonic = this.passMnemonic.bind(this)

    _this = this
=======
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
>>>>>>> upstream/master
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

<<<<<<< HEAD
      // Update the list of potential back end servers.
      this.addToModal('Getting alternative servers')
      const servers = await this.asyncLoad.getServers()
      this.setState({
        servers
      })

      // Initialize the BCH wallet with the currently selected server.
      this.addToModal('Initializing wallet')
      const bchWallet = await this.asyncLoad.initWallet(serverUrl, this.mnemonic, this.setLSState, this.updateBchWalletState)
      this.setState({
        bchWallet
      })

      // Get the BCH balance of the wallet.
      this.addToModal('Getting BCH balance')
      await this.asyncLoad.getWalletBchBalance(bchWallet, this.updateBchWalletState)

      // Get the SLP tokens held by the wallet.
      this.addToModal('Getting SLP tokens')
      await this.asyncLoad.getSlpTokenBalances(bchWallet, this.updateBchWalletState)

      // Get the SLP tokens held by the wallet.
      this.addToModal('Getting BCH spot price in USD')
      await this.asyncLoad.getUSDExchangeRate(bchWallet, this.updateBchWalletState)

      // Close the modal once initialization is done.
      this.setState({
        showStartModal: false,
        asyncInitFinished: true,
        asyncInitSucceeded: true,
        denyClose: false
      })
    } catch (err) {
      this.modalBody = [
        `Error: ${err.message}`,
        'Try selecting a different back end server using the drop-down menu at the bottom of the app.'
      ]
=======
          addToModal('Loading minimal-slp-wallet', appData)

          setDenyClose(true)

          await asyncLoad.loadWalletLib()
          // console.log('Wallet: ', Wallet)

          addToModal('Getting alternative servers', appData)
          const gistServers = await asyncLoad.getServers()
          setServers(gistServers)
          // console.log('servers: ', servers)
>>>>>>> upstream/master

          // throw new Error('test error')

          addToModal('Initializing wallet', appData)
          console.log(`Initializing wallet with back end server ${serverUrl}`)

<<<<<<< HEAD
    // This is a macro object that is passed to all child components. It gathers
    // all the data and handlers used throughout the app.
    const appData = {
      // Wallet and wallet state
      bchWallet: this.state.bchWallet,
      wallet: this.state.bchWallet,
      bchWalletState: this.state.bchWalletState,

      // Functions
      updateBchWalletState: this.updateBchWalletState,
      setLSState: this.setLSState,
      delLSState: this.delLSState,

      servers: this.state.servers, // Alternative back end servers

      Sweep: this.state.Sweep // Sweep library
    }

    return (
      <>
        <GetRestUrl />
        <LoadScripts />
        <LoadLocalStorage passMnemonic={this.passMnemonic} />
        <NavMenu menuHandler={this.onMenuClick} />

        {
          this.state.showStartModal
            ? <UninitializedView
                modalBody={this.state.modalBody}
                hideSpinner={this.state.hideSpinner}
                appData={appData}
                denyClose={this.state.denyClose}
              />
            : <InitializedView
                wallet={this.state.wallet}
                menuState={this.state.menuState}
                appData={appData}
              />
=======
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
>>>>>>> upstream/master
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

<<<<<<< HEAD
    _this.setState({
      menuState
    })
  }

  // This function is used to retrieve the mnemonic from LocalStorage, which
  // is handled by a child component (load-localstorage.js)
  passMnemonic (lsState, setLSState, delLSState) {
    // console.log(`mnemonic loaded from local storage: ${mnemonic}`)

    // Get the mnemonic from local storage.
    this.mnemonic = lsState.mnemonic

    // Save handles to the LocalStorage State, as well as the functions to save
    // and delete items from the LocalStorage.
    this.lsState = lsState
    this.setLSState = setLSState
    this.delLSState = delLSState
  }

  // This function is passed to child components in order to update the wallet
  // state. This function is important to make this wallet a PWA.
  updateBchWalletState (walletObj) {
    // console.log('updateBchWalletState() walletObj: ', walletObj)

    const oldState = _this.state.bchWalletState

    const bchWalletState = Object.assign({}, oldState, walletObj)

    _this.setState({
      bchWalletState
    })

    // console.log(`New wallet state: ${JSON.stringify(bchWalletState, null, 2)}`)
  }
=======
// This handler is passed into the child menu component. When an item in the
// nav menu is clicked, this handler will update the state. The state is
// used by the AppBody component to determine which View component to display.
function onMenuClick (menuState, appData) {
  // console.log('onMenuClick() menuState: ', menuState)

  appData.setMenuState(menuState)
>>>>>>> upstream/master
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
<<<<<<< HEAD
      <AppBody
        menuState={_this.state.menuState}
        appData={props.appData}
      />
=======
      <AppBody menuState={props.menuState} appData={props.appData} />
>>>>>>> upstream/master
    </>
  )
}

export default App
