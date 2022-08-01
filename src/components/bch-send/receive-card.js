/*
  This card displays the users BCH and SLP address and QR code
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import QRCode from 'qrcode.react'
import { Clipboard } from '@capacitor/clipboard'

let _this

class ReceiveCard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData,
      addrSwitch: false,
      displayCopyMsg: false
    }

    _this = this
  }

  render () {
    // Determine which address to display
    let addrToDisplay = this.state.appData.bchWalletState.cashAddress
    const addrSwitch = this.state.addrSwitch
    if (!addrSwitch) {
      addrToDisplay = this.state.appData.bchWalletState.cashAddress
    } else {
      addrToDisplay = this.state.appData.bchWalletState.slpAddress
    }

    return (
      <>
        <Card>
          <Card.Body style={{ textAlign: 'center' }}>
            <Card.Title>
              <h2><FontAwesomeIcon icon={faWallet} size='lg' /> Receive</h2>
            </Card.Title>
            <br />

            <Container>
              <Row>
                <Col style={{ color: 'green' }}>
                  {this.state.displayCopyMsg ? 'Copied' : null}
                </Col>
              </Row>

              <Row>
                <Col>
                  <QRCode
                    className='qr-code'
                    value={addrToDisplay}
                    size={256}
                    includeMargin
                    fgColor='#333'
                    onClick={this.handleCopyAddress}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>{addrToDisplay}</p>
                </Col>
              </Row>

              <Row>
                <Col xs={4} />
                <Col xs={4}>
                  <Form>
                    <Form.Check
                      type='switch'
                      id='address-switch'
                      onChange={e => this.handleAddrSwitchToggle(e)}
                    />
                  </Form>
                </Col>
                <Col xs={4} />
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </>
    )
  }

  // Copy the selected address to the clipboard when the QR image is clicked
  async handleCopyAddress (event) {
    // console.log('QR code clicked')

    // Determine which address to display
    let addrToDisplay = _this.state.appData.bchWalletState.cashAddress
    const addrSwitch = _this.state.addrSwitch
    if (!addrSwitch) {
      addrToDisplay = _this.state.appData.bchWalletState.cashAddress
    } else {
      addrToDisplay = _this.state.appData.bchWalletState.slpAddress
    }

    try {
      // Capacitor Android environment.

      // Write the value to the clipboard.
      await Clipboard.write({
        string: addrToDisplay
      })
    } catch (err) {
      // Browser environment. Use normal browser methods.

      const textArea = document.createElement('textarea')
      textArea.value = addrToDisplay
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('Copy')
      textArea.remove()
    }

    // Display the copied message.
    _this.setState({
      displayCopyMsg: true
    })

    // Clear the copied message after some time.
    setTimeout(function () {
      _this.setState({
        displayCopyMsg: false
      })
    }, 1000)
  }

  // Event handler that updates the state when the address switch is toggled.
  handleAddrSwitchToggle (event) {
    // console.log('event.target.checked: ', event.target.checked)

    this.setState({ addrSwitch: event.target.checked })
  }
}

export default ReceiveCard
