/*
  This View allows sending and receiving of BCH
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faRedo } from '@fortawesome/free-solid-svg-icons'

// Local libraries
import RefreshBchBalance from './refresh-bch-balance'
import SendCard from './send-card'
import BalanceCard from './balance-card'
import ReceiveCard from './receive-card'
// import WaitingModal from '../waiting-modal'

// Working array for storing modal output.
// this.modalBody = []

let _this

class BchSend extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData
      // modalBody: this.modalBody
    }

    // Create a reference to the Refresh button.
    this.refreshBchButtonRef = React.createRef()

    _this = this
  }

  render () {
    return (
      <>
        <Container>
          <Row>
            <Col xs={6}>
              <RefreshBchBalance
                appData={this.state.appData}
                ref={this.refreshBchButtonRef}
              />
            </Col>
            <Col xs={6} />
          </Row>
          <br />

          <Row>
            <Col style={{ textAlign: 'center' }}>
              <BalanceCard appData={this.state.appData} />
            </Col>
          </Row>
          <br />

          <Row>
            <Col>
              <SendCard
                appData={this.state.appData}
                refreshBchBalance={this.refreshBchBalance}
              />
            </Col>
          </Row>
          <br />

          <Row>
            <Col>
              <ReceiveCard appData={this.state.appData} />
            </Col>
          </Row>
        </Container>
      </>
    )
  }

  // This function is triggered when the BCH balance needs to be refreshed
  // from the blockchain.
  // This needs to happen after sending bch, to reflect the changed balance
  // within the wallet app.
  // This function triggers the on-click function within the refresh-bch-balance.js button.
  async refreshBchBalance () {
    // const appData = await _this.refreshBchButtonRef.current.handleRefreshBalance()
    await _this.refreshBchButtonRef.current.handleRefreshBalance()

    // console.log('new appData: ', appData)

    // _this.setState({ appData })

    // _this.render()
  }
}

export default BchSend
