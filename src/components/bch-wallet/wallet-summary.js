/*
  This component displays a summary of the wallet.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faCopy, faEye } from '@fortawesome/free-solid-svg-icons'

// Local libraries
import CopyOnClick from './copy-on-click'

class WalletSummary extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      bchWallet: props.bchWallet,
      bchWalletState: props.bchWalletState,
      appData: props.appData
    }
  }

  render () {
    // console.log(`WalletSummary render() this.state.bchWalletState: ${JSON.stringify(this.state.bchWalletState, null, 2)}`)

    return (
      <>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center' }}>
                    <h2>
                      <FontAwesomeIcon icon={faWallet} />{' '}
                      <span>My Wallet</span>
                    </h2>
                  </Card.Title>
                  <Container>
                    <Row style={{ padding: '25px' }}>
                      <Col xs={12} sm={10} lg={8}>
                        <b>Mnemonic:</b> {this.state.bchWalletState.mnemonic}
                      </Col>
                      <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                        <FontAwesomeIcon icon={faEye} />
                      </Col>
                      <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                        <CopyOnClick appData={this.state.appData} walletProp='mnemonic' />
                      </Col>
                    </Row>

                    <Row style={{ padding: '25px', backgroundColor: '#eee' }}>
                      <Col xs={12} sm={10} lg={8}>
                        <b>Private Key:</b> {this.state.bchWalletState.privateKey}
                      </Col>
                      <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                        <FontAwesomeIcon icon={faEye} />
                      </Col>
                      <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                        <FontAwesomeIcon icon={faCopy} />
                      </Col>
                    </Row>

                    <Row style={{ padding: '25px' }}>
                      <Col xs={12} sm={10} lg={8}>
                        <b>Cash Address:</b> {this.state.bchWalletState.cashAddress}
                      </Col>
                      <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }} />
                      <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                        <FontAwesomeIcon icon={faCopy} />
                      </Col>
                    </Row>

                    <Row style={{ padding: '25px', backgroundColor: '#eee' }}>
                      <Col xs={12} sm={10} lg={8}>
                        <b>SLP Address:</b> {this.state.bchWalletState.slpAddress}
                      </Col>
                      <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }} />
                      <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                        <FontAwesomeIcon icon={faCopy} />
                      </Col>
                    </Row>

                    <Row style={{ padding: '25px' }}>
                      <Col xs={12} sm={10} lg={8}>
                        <b>Legacy Address:</b> {this.state.bchWalletState.legacyAddress}
                      </Col>
                      <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }} />
                      <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                        <FontAwesomeIcon icon={faCopy} />
                      </Col>
                    </Row>

                    <Row style={{ padding: '25px', backgroundColor: '#eee' }}>
                      <Col xs={10} sm={10} lg={8}>
                        <b>HD Path:</b> {this.state.bchWalletState.hdPath}
                      </Col>
                      <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }} />
                      <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                        <FontAwesomeIcon icon={faCopy} />
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>

            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

/*

<Container>
  <Row style={{ padding: '25px' }}>
    <Col xs={12} sm={10} lg={8}>
      <span><b>Mnemonic:</b> {this.state.bchWalletState.mnemonic}</span>
    </Col>
    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
      <FontAwesomeIcon icon={faEye} />
    </Col>
    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
      <FontAwesomeIcon icon={faCopy} />
    </Col>
  </Row>

  <Row style={{ padding: '25px', backgroundColor: '#eee' }}>
    <Col xs={12} sm={10} lg={8}>
      <span><b>Private Key:</b> {this.state.bchWalletState.privateKey}</span>
    </Col>
    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
      <FontAwesomeIcon icon={faEye} />
    </Col>
    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
      <FontAwesomeIcon icon={faCopy} />
    </Col>
  </Row>

  <Row style={{ padding: '25px' }}>
    <Col xs={12} sm={10} lg={8}>
      <span><b>Cash Address:</b> {this.state.bchWalletState.cashAddress}</span>
    </Col>
    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }} />
    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
      <FontAwesomeIcon icon={faCopy} />
    </Col>
  </Row>

  <Row style={{ padding: '25px', backgroundColor: '#eee' }}>
    <Col xs={12} sm={10} lg={8}>
      <span><b>SLP Address:</b> {this.state.bchWalletState.slpAddress}</span>
    </Col>
    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }} />
    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
      <FontAwesomeIcon icon={faCopy} />
    </Col>
  </Row>

  <Row style={{ padding: '25px' }}>
    <Col xs={12} sm={10} lg={8}>
      <span><b>Legacy Address:</b> {this.state.bchWalletState.legacyAddress}</span>
    </Col>
    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }} />
    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
      <FontAwesomeIcon icon={faCopy} />
    </Col>
  </Row>

  <Row style={{ padding: '25px', backgroundColor: '#eee' }}>
    <Col xs={10} sm={10} lg={8}>
      <span><b>HD Path:</b> {this.state.bchWalletState.hdPath}</span>
    </Col>
    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }} />
    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
      <FontAwesomeIcon icon={faCopy} />
    </Col>
  </Row>
</Container>
*/

export default WalletSummary
