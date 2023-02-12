/*
  This component displays a summary of the wallet.
*/

// Global npm libraries
import React, { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// import { Clipboard } from '@capacitor/clipboard'

// Local libraries
import './wallet-summary.css'
import CopyOnClick from './copy-on-click'

function WalletSummary (props) {
  // Dependency injection through props
  const appData = props.appData

  // const wallet = appData.wallet
  const bchWalletState = appData.bchWalletState

  // Component state
  const [blurredMnemonic, setBlurredMnemonic] = useState(true)
  const [blurredPrivateKey, setBlurredPrivateKey] = useState(true)

  // Encapsulate component state into an object that can be passed to child functions
  const walletSummaryData = {
    blurredMnemonic,
    setBlurredMnemonic,
    blurredPrivateKey,
    setBlurredPrivateKey
  }

  // console.log(`WalletSummary render() bchWalletState: ${JSON.stringify(bchWalletState, null, 2)}`)

  const eyeIcon = {
    mnemonic: blurredMnemonic ? faEyeSlash : faEye,
    privateKey: blurredPrivateKey ? faEyeSlash : faEye
  }

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
                    <Col xs={12} sm={10} lg={8} style={{ padding: '10px' }}>
                      <b>Mnemonic:</b> <span className={blurredMnemonic ? 'blurred' : null}>{bchWalletState.mnemonic}</span>
                    </Col>
                    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                      <FontAwesomeIcon icon={eyeIcon.mnemonic} size='lg' onClick={() => toggleMnemonicBlur({ walletSummaryData })} />
                    </Col>
                    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                      <CopyOnClick walletProp='mnemonic' appData={appData} />
                    </Col>
                  </Row>

                  <Row style={{ padding: '25px', backgroundColor: '#eee' }}>
                    <Col xs={12} sm={10} lg={8} style={{ padding: '10px' }}>
                      <b>Private Key:</b> <span className={blurredPrivateKey ? 'blurred' : null}>{bchWalletState.privateKey}</span>
                    </Col>
                    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                      <FontAwesomeIcon icon={eyeIcon.privateKey} size='lg' onClick={() => togglePrivateKeyBlur({ walletSummaryData })} />
                    </Col>
                    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                      <CopyOnClick walletProp='privateKey' appData={appData} />
                    </Col>
                  </Row>

                  <Row style={{ padding: '25px' }}>
                    <Col xs={12} sm={10} lg={8} style={{ padding: '10px' }}>
                      <b>Cash Address:</b> {bchWalletState.cashAddress}
                    </Col>
                    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }} />
                    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                      <CopyOnClick walletProp='cashAddress' appData={appData} />
                    </Col>
                  </Row>

                  <Row style={{ padding: '25px', backgroundColor: '#eee' }}>
                    <Col xs={12} sm={10} lg={8} style={{ padding: '10px' }}>
                      <b>SLP Address:</b> {bchWalletState.slpAddress}
                    </Col>
                    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }} />
                    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                      <CopyOnClick walletProp='slpAddress' appData={appData} />
                    </Col>
                  </Row>

                  <Row style={{ padding: '25px' }}>
                    <Col xs={12} sm={10} lg={8} style={{ padding: '10px' }}>
                      <b>Legacy Address:</b> {bchWalletState.legacyAddress}
                    </Col>
                    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }} />
                    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                      <CopyOnClick walletProp='legacyAddress' appData={appData} />
                    </Col>
                  </Row>

                  <Row style={{ padding: '25px', backgroundColor: '#eee' }}>
                    <Col xs={10} sm={10} lg={8} style={{ padding: '10px' }}>
                      <b>HD Path:</b> {bchWalletState.hdPath}
                    </Col>
                    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }} />
                    <Col xs={6} sm={1} lg={2} style={{ textAlign: 'center' }}>
                      <CopyOnClick walletProp='hdPath' appData={appData} />
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

// Toggle the state of blurring for the mnemonic
function toggleMnemonicBlur (inObj = {}) {
  const { walletSummaryData } = inObj

  // toggle the state of blurring
  const blurredState = walletSummaryData.blurredMnemonic
  walletSummaryData.setBlurredMnemonic(!blurredState)
}

// Toggle the state of blurring for the private key
function togglePrivateKeyBlur (inObj = {}) {
  const { walletSummaryData } = inObj

  // toggle the state of blurring
  const blurredState = walletSummaryData.blurredPrivateKey
  walletSummaryData.setBlurredPrivateKey(!blurredState)

  // this.setState({
  //   blurredPrivateKey: !_this.state.blurredPrivateKey
  // })
}

// async function copyToClipboard (key) {
//   // console.log('copyToClipboard() key: ', key)
//
//   const val = _this.state.bchWalletState[key]
//   // console.log(`value copied to clipboard: ${val}`)
//
//   try {
//     // Capacitor Android environment.
//
//     // Write the value to the clipboard.
//     await Clipboard.write({
//       string: val
//     })
//   } catch (err) {
//     // Browser environment. Use normal browser methods.
//
//     const textArea = document.createElement('textarea')
//     textArea.value = val
//     document.body.appendChild(textArea)
//     textArea.select()
//     document.execCommand('Copy')
//     textArea.remove()
//   }
// }

export default WalletSummary
