/*
  This component controls sending of BCH.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPaste, faRandom } from '@fortawesome/free-solid-svg-icons'

let _this

class SendCard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      // Wallet and App data passed from parent components.
      appData: props.appData,

      bchAddr: '',
      amountUnits: 'USD',
      amountStr: '',
      amountUsd: 0, // on-the-fly calculated USD amount.
      amountBch: 0, // on-the-fly calculated BCH amount.

      // Used to display the opposite units and quantity.
      oppositeUnits: 'BCH',
      oppositeQty: 0
    }

    _this = this
  }

  render () {
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>
              <h2><FontAwesomeIcon icon={faPaperPlane} size='lg' /> Send</h2>
            </Card.Title>
            <br />

            <Container>
              <Row>
                <Col style={{ textAlign: 'center' }}>
                  <b>BCH Address:</b>
                </Col>
              </Row>

              <Row>
                <Col xs={10}>
                  <Form>
                    <Form.Group controlId='formBasicEmail' style={{ textAlign: 'center' }}>
                      <Form.Control type='text' placeholder='bitcoincash:qqlrzp23w08434twmvr4fxw672whkjy0py26r63g3d' onChange={e => this.setState({ bchAddr: e.target.value })} />
                    </Form.Group>
                  </Form>
                </Col>

                <Col xs={2}>
                  <FontAwesomeIcon icon={faPaste} size='lg' onClick={(e) => _this.pasteFromClipboard(e)} />
                </Col>
              </Row>
              <br />

              <Row>
                <Col style={{ textAlign: 'center' }}>
                  <b>Amount:</b>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Form style={{ paddingBottom: '10px' }}>
                    <Form.Group controlId='formBasicEmail' style={{ textAlign: 'center' }}>
                      <Form.Control type='text' onChange={this.handleUpdateAmount} value={this.state.amountStr} />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  Units: {this.state.amountUnits} <FontAwesomeIcon icon={faRandom} size='lg' onClick={this.handleSwitchUnits} />
                </Col>
                <Col xs={6} style={{ textAlign: 'right' }}>
                  {this.state.oppositeUnits}: {this.state.oppositeQty}
                </Col>
              </Row>
              <br />

              <Row>
                <Col style={{ textAlign: 'center' }}>
                  <Button onClick={this.handleSendBch}>Send</Button>
                </Col>
              </Row>

            </Container>
          </Card.Body>
        </Card>
      </>
    )
  }

  // This is an on-change event handler that updates the amount calculated in
  // both BCH and USD as the user types.
  handleUpdateAmount (event) {
    const amountStr = event.target.value
    // console.log('amountStr: ', amountStr)

    try {
      const amountQty = parseFloat(amountStr)

      // console.log('appData: ', _this.state.appData)
      const bchUsdPrice = _this.state.appData.bchWalletState.bchUsdPrice
      const bchjs = _this.state.appData.bchWallet.bchjs

      // Initialize local variables
      let oppositeQty = 0
      let amountUsd = 0
      let amountBch = 0

      // Calculate the amount in the opposite units.
      const currentUnit = _this.state.amountUnits
      if (currentUnit.includes('USD')) {
        // Convert USD to BCH
        oppositeQty = bchjs.Util.floor8(amountQty / bchUsdPrice)
        amountUsd = amountQty
        amountBch = oppositeQty
      } else {
        // Convert BCH to USD
        oppositeQty = bchjs.Util.floor2(amountQty * bchUsdPrice)
        amountUsd = oppositeQty
        amountBch = amountQty
      }

      _this.setState({
        oppositeQty,
        amountUsd,
        amountBch,
        amountStr
      })
    } catch (err) {
      /* exit quietly */
      console.log('Error: ', err)
    }
  }

  // This is a click event handler that toggles the units between BCH and USD.
  handleSwitchUnits () {
    // Toggle the unit
    let newUnit = ''
    let oppositeUnits = ''
    const oldUnit = _this.state.amountUnits
    if (oldUnit.includes('USD')) {
      newUnit = 'BCH'
      oppositeUnits = 'USD'
    } else {
      newUnit = 'USD'
      oppositeUnits = 'BCH'
    }

    // Clear the Amount text box

    _this.setState({
      amountUnits: newUnit,
      oppositeUnits,
      amountStr: '',
      oppositeQty: 0,
      amountUsd: 0,
      amountBch: 0
    })
  }

  // Send BCH based to the address in the form, and the amount specified in the
  // form.
  async handleSendBch () {
    console.log('Sending BCH')

    const amountBch = _this.state.amountBch
    let bchAddr = _this.state.bchAddr
    console.log(`Sending ${amountBch} BCH to ${bchAddr}`)

    const wallet = _this.state.appData.bchWallet
    const bchjs = wallet.bchjs

    // If the address is an SLP address, convert it to a cash address.
    if (!bchAddr.includes(bchAddr)) {
      bchAddr = bchjs.SLP.Address.toCashAddress(bchAddr)
    }

    // Convert the BCH to satoshis
    const sats = bchjs.BitcoinCash.toSatoshi(amountBch)

    // Update the wallets UTXOs
    console.log('Updating UTXOs...')
    await wallet.getUtxos()

    const receivers = [{
      address: bchAddr,
      amountSat: sats
    }]
    const txid = await wallet.send(receivers)
    console.log(`txid: ${txid}`)
  }
}

export default SendCard
