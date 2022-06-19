/*
  This is an SPA that displays information about NFTs on the BCH blockchain.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useQueryParam, StringParam } from 'use-query-params'

// Local libraries
import './App.css'
import LoadScripts from './components/load-scripts'
import NFTs from './components/nfts'
import WaitingModal from './components/waiting-modal'
import AsyncLoad from './services/async-load'
import ServerSelect from './components/servers'
import Footer from './components/footer'

// Token ID for Trout's NFTs
const groupTokenId = '030563ddd65772d8e9b79b825529ed53c7d27037507b57c528788612b4911107'

// Default restURL for a back-end server.
let serverURL = 'https://free-bch.fullstack.cash'

class App extends React.Component {
  constructor (props) {
    super(props)

    // Encasulate dependencies
    this.asyncLoad = new AsyncLoad()

    // Working array for storing modal output.
    this.modalBody = []
    this.tokenData = {}

    this.state = {
      walletInitialized: false,
      wallet: false,
      modalBody: this.modalBody,
      hideSpinner: false
    }

    this.cnt = 0
  }

  async componentDidMount () {
    try {
      this.addToModal('Loading minimal-slp-wallet')

      await this.asyncLoad.loadWalletLib()

      this.addToModal('Initializing wallet')

      const wallet = await this.asyncLoad.initWallet(serverURL)

      this.addToModal('Getting Group Token Information')

      // Get Group Token info
      const groupData = await this.asyncLoad.getGroupData(groupTokenId)
      // console.log(`groupData: ${JSON.stringify(groupData, null, 2)}`)

      this.addToModal('Getting NFT Information')

      /// Get NFT child info
      const nftData = []
      for (let i = 0; i < groupData.nfts.length; i++) {
        const tokenData = await this.asyncLoad.getTokenData(groupData.nfts[i])
        nftData.push(tokenData)
      }
      // console.log(`nft data: ${JSON.stringify(nftData, null, 2)}`)

      this.tokenData = {
        groupData,
        nftData
      }

      this.setState({
        wallet,
        walletInitialized: true
      })
    } catch (err) {
      this.modalBody = [
        `Error: ${err.message}`,
        `Try selecting a different back end server using the drop-down menu at the bottom of the app.`
      ]

      this.setState({
        modalBody: this.modalBody,
        hideSpinner: true
      })
    }
  }

  render () {
    // console.log('App component rendered. this.state.wallet: ', this.state.wallet)

    return (
      <>
        <GetRestUrl />
        <LoadScripts />
        {this.state.walletInitialized ? <InitializedView wallet={this.state.wallet} tokens={this.tokenData} /> : <UninitializedView modalBody={this.state.modalBody} hideSpinner={this.state.hideSpinner}/>}
        <ServerSelect />
        <Footer />
      </>
    )
  }

  // Add a new line to the waiting modal.
  addToModal (inStr) {
    this.modalBody.push(inStr)

    this.setState({
      modalBody: this.modalBody
    })
  }
}

// This is rendered *before* the BCH wallet is initialized.
function UninitializedView (props) {
  // console.log('UninitializedView props: ', props)

  const heading = 'Loading Blockchain Data...'

  return (
    <Container style={{ backgroundColor: '#ddd' }}>
      <Row style={{ padding: '25px' }}>
        <Col>
          <h1 className='header'>NFT Explorer</h1>

          <WaitingModal heading={heading} body={props.modalBody} hideSpinner={props.hideSpinner} />
        </Col>
      </Row>
    </Container>
  )
}

// This is rendered *after* the BCH wallet is initialized.
function InitializedView (props) {
  return (
    <>
      <Container style={{ backgroundColor: '#ddd' }}>
        <Row style={{ padding: '25px' }}>
          <Col>
            <h1 className='header'>NFT Explorer</h1>
          </Col>
        </Row>
      </Container>
      <NFTs wallet={props.wallet} tokens={props.tokens} />
    </>
  )
}

function GetRestUrl (props) {
  const [restURL] = useQueryParam('restURL', StringParam)
  // console.log('restURL: ', restURL)

  serverURL = restURL

  return (<></>)
}

// function sleep (ms) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

export default App
