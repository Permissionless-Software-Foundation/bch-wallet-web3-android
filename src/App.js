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
      wallet: false, // BCH wallet instance
      menuState: 0, // The current View being displayed in the app
      serverUrl, // Stores the URL for the currently selected server.
      servers: defaultServerOptions, // A list of back end servers.

      // Startup Modal
      showStartModal: true, // Should the startup modal be visible?
      asyncInitFinished: false, // Did startup finish?
      asyncInitSucceeded: null, // Did startup finish successfully?
      modalBody: [], // Strings displayed in the modal
      hideSpinner: false, // Spinner gif in modal
      denyClose: false
    }

    this.cnt = 0

    _this = this
  }

  async componentDidMount () {
    try {
      this.addToModal('Loading minimal-slp-wallet')

      this.setState({
        denyClose: true
      })

      await this.asyncLoad.loadWalletLib()

      this.addToModal('Getting alternative servers')
      const servers = await this.asyncLoad.getServers()
      // console.log('servers: ', servers)

      this.addToModal('Initializing wallet')
      // console.log(`Initializing wallet with back end server ${serverUrl}`)

      const wallet = await this.asyncLoad.initWallet(serverUrl)

      this.setState({
        wallet,
        serverUrl,
        // queryParamExists,
        servers,
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

      this.setState({
        modalBody: this.modalBody,
        hideSpinner: true,
        showStartModal: true,
        asyncInitFinished: true,
        asyncInitSucceeded: false,
        denyClose: false
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
      servers: this.state.servers, // Alternative back end servers
      wallet: this.state.wallet
    }

    return (
      <>
        <GetRestUrl />
        <LoadScripts />
        <NavMenu menuHandler={this.onMenuClick} />

        {
          this.state.showStartModal
            ? <UninitializedView
                modalBody={this.state.modalBody}
                hideSpinner={this.state.hideSpinner}
                appData={appData}
                denyClose={this.state.denyClose}
              />
            : <InitializedView wallet={this.state.wallet} menuState={this.state.menuState} appData={appData} />
        }

        <SelectServerButton menuHandler={this.onMenuClick} />
        <Footer appData={appData} />
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
}

// This is rendered *before* the BCH wallet is initialized.
function UninitializedView (props) {
  // console.log('UninitializedView props: ', props)

  const heading = 'Loading Blockchain Data...'

  return (
    <>
      <WaitingModal
        heading={heading}
        body={props.modalBody}
        hideSpinner={props.hideSpinner}
        denyClose={props.denyClose}
      />

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
      <AppBody menuState={_this.state.menuState} wallet={props.wallet} appData={props.appData} />
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
