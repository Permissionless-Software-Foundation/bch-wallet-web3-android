/*
  This component controlls the Wallet View.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

// Local Libraries
import WebWalletWarning from './warning'
import WalletSummary from './wallet-summary'
import WalletClear from './clear-wallet'
import WalletImport from './import-wallet'

class BchWallet extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData,
      bchWallet: props.appData.bchWallet,
      bchWalletState: props.appData.bchWalletState,
      delLSState: props.appData.delLSState,
      setLSState: props.appData.setLSState
    }
  }

  render () {
    return (
      <>
        <Container>
          <Row>
            <Col style={{ textAlign: 'right' }}>
              <a href='https://youtu.be/0R00cppN0fA' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faCircleQuestion} size='lg' />
              </a>
            </Col>
          </Row>
        </Container>
        <WebWalletWarning />
        <br />
        <WalletSummary bchWallet={this.state.bchWallet} bchWalletState={this.state.bchWalletState} appData={this.state.appData} />
        <br />
        <WalletClear delLSState={this.state.delLSState} />
        <br />
        <WalletImport bchWallet={this.state.bchWallet} setLSState={this.state.setLSState} />
      </>
    )
  }
}

export default BchWallet
