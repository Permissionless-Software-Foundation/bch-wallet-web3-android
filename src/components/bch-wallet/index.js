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
import OptimizeWallet from './optimize-wallet'

function BchWallet (props) {
  // Dependency injection through props
  const appData = props.appData

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
      <WalletSummary appData={appData} />
      <br />
      <WalletClear appData={appData} />
      <br />
      <WalletImport appData={appData} />
      <br />
      <OptimizeWallet appData={appData} />
    </>
  )
}

export default BchWallet
