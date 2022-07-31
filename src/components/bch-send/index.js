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

// let _this

class BchSend extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData
      // modalBody: this.modalBody
    }

    // _this = this
  }

  render () {
    return (
      <>
        <Container>
          <Row>
            <Col xs={6}>
              <RefreshBchBalance appData={this.state.appData} />
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
              <SendCard appData={this.state.appData} />
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

  // Add a new line to the waiting modal.
  // addToModal (inStr) {
  //   this.modalBody.push(inStr)
  //
  //   this.setState({
  //     modalBody: this.modalBody
  //   })
  // }
}

export default BchSend
