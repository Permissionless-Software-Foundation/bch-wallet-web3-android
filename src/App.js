/*
  This is an SPA that creates a template for future BCH web3 apps.
*/

// Global npm libraries
import React from 'react'
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

// Default restURL for a back-end server.
let serverUrl = 'https://free-bch.fullstack.cash'

// Default alternative servers.
const defaultServerOptions = [
  { value: 'https://free-bch.fullstack.cash', label: 'https://free-bch.fullstack.cash' },
  { value: 'https://bc01-ca-bch-consumer.fullstackcash.nl', label: 'https://bc01-ca-bch-consumer.fullstackcash.nl' },
  { value: 'https://pdx01-usa-bch-consumer.fullstackcash.nl', label: 'https://pdx01-usa-bch-consumer.fullstackcash.nl' },
  { value: 'https://wa-usa-bch-consumer.fullstackcash.nl', label: 'https://wa-usa-bch-consumer.fullstackcash.nl' }
]

let _this

class App extends React.Component {
  constructor (props) {
    super(props)

    // Encasulate dependencies
    this.asyncLoad = new AsyncLoad()

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
      }
    }

    this.cnt = 0

    // These values are set by load-localstorage.js when it reads Local Storage.
    this.mnemonic = undefined
    this.setMnemonic = undefined
    this.delMnemonic = undefined

    _this = this
  }

  async componentDidMount () {
    try {
      this.addToModal('Loading minimal-slp-wallet')

      await this.asyncLoad.loadWalletLib()

      // Update the list of potential back end servers.
      this.addToModal('Getting alternative servers')
      const servers = await this.asyncLoad.getServers()
      this.setState({
        servers
      })

      // Initialize the BCH wallet with the currently selected server.
      this.addToModal('Initializing wallet')
      const bchWallet = await this.asyncLoad.initWallet(serverUrl, this.mnemonic, this.setMnemonic, this.updateBchWalletState)
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
        asyncInitSucceeded: true
      })
    } catch (err) {
      this.modalBody = [
        `Error: ${err.message}`,
        'Try selecting a different back end server using the drop-down menu at the bottom of the app.'
      ]

      this.setState({
        modalBody: this.modalBody,
        hideSpinner: true,
        showStartModal: true,
        asyncInitFinished: true,
        asyncInitSucceeded: false
      })
    }
  }

  render () {
    // console.log('App component rendered. this.state.wallet: ', this.state.wallet)
    // console.log(`App component menuState: ${this.state.menuState}`)
    // console.log(`render() this.state.serverUrl: ${this.state.serverUrl}`)

    // This is a macro object that is passed to all child components. It gathers
    // all the data and handlers used throughout the app.
    const appData = {
      // Wallet and wallet state
      bchWallet: this.state.bchWallet,
      bchWalletState: this.state.bchWalletState,

      // Functions
      updateBchWalletState: this.updateBchWalletState,
      setMnemonic: this.setMnemonic,
      delMnemonic: this.delMnemonic,

      servers: this.state.servers // Alternative back end servers
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
              />
            : <InitializedView
                wallet={this.state.wallet}
                menuState={this.state.menuState}
                appData={appData}
              />
        }

        <SelectServerButton menuHandler={this.onMenuClick} />
        <Footer />
      </>
    )
  }

  // Add a new line to the waiting modal.
  addToModal (inStr) {
    const modalBody = this.state.modalBody

    modalBody.push(inStr)

    this.setState({
      modalBody
    })
  }

  // This handler is passed into the child menu component. When an item in the
  // nav menu is clicked, this handler will update the state. The state is
  // used by the AppBody component to determine which View component to display.
  onMenuClick (menuState) {
    // console.log('menuState: ', menuState)

    _this.setState({
      menuState
    })
  }

  // This function is used to retrieve the mnemonic from local storage, which
  // is handled by a child component (load-localstorage.js)
  passMnemonic (mnemonic, setMnemonic, delMnemonic) {
    // console.log(`mnemonic loaded from local storage: ${mnemonic}`)

    _this.mnemonic = mnemonic
    _this.setMnemonic = setMnemonic
    _this.delMnemonic = delMnemonic
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
}

// This is rendered *before* the BCH wallet is initialized.
function UninitializedView (props) {
  // console.log('UninitializedView props: ', props)

  const heading = 'Loading Blockchain Data...'

  return (
    <>
      <WaitingModal heading={heading} body={props.modalBody} hideSpinner={props.hideSpinner} />

      {
        _this.state.asyncInitFinished
          ? <AppBody menuState={100} wallet={props.wallet} appData={props.appData} />
          : null
      }
    </>
  )
}

// This is rendered *after* the BCH wallet is initialized.
function InitializedView (props) {
  // console.log(`InitializedView props.menuState: ${props.menuState}`)
  // console.log(`InitializedView _this.state.menuState: ${_this.state.menuState}`)

  return (
    <>
      <br />
      <AppBody
        menuState={_this.state.menuState}
        appData={props.appData}
      />
    </>
  )
}

// Get the restURL query parameter.
function GetRestUrl (props) {
  const [restURL] = useQueryParam('restURL', StringParam)
  // console.log('restURL: ', restURL)

  if (restURL) {
    serverUrl = restURL
    // queryParamExists = true
  }

  return (<></>)
}

export default App
