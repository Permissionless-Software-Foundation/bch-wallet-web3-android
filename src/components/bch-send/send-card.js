/*
  This component controls sending of BCH.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Card, Form, Button, Modal, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPaste, faRandom } from '@fortawesome/free-solid-svg-icons'
import { Clipboard } from '@capacitor/clipboard'

// Local libraries
// import WaitingModal from '../waiting-modal'

let _this

class SendCard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      // Wallet and App data passed from parent components.
      appData: props.appData,

      // Function from parent View component. Called after sending tokens,
      // to trigger a refresh of the wallet token balances.
      refreshBchBalance: props.refreshBchBalance,

      bchAddr: '',
      amountUnits: 'USD',
      amountStr: '',
      amountUsd: 0, // on-the-fly calculated USD amount.
      amountBch: 0, // on-the-fly calculated BCH amount.

      // Used to display the opposite units and quantity.
      oppositeUnits: 'BCH',
      oppositeQty: 0,

      // Modal variables
      modalBody: [],
      hideModalSpinner: false,
      hideModal: true,
      refreshOnClose: false // Indicates if the BCH balance should be refreshed on close.
    }

    _this = this
  }

  // <ModalTemplate
  //   heading='Sending BCH'
  //   body={this.state.modalBody}
  //   hideSpinner={this.state.hideModalSpinner}
  //   closeFunc={this.onModalClose}
  //   hideModal={this.state.hideModal}
  //   instance={this}
  // />

  render () {
    return (
      <>
        {
          this.state.hideModal
            ? null
            : (<ModalTemplate
                heading='Sending BCH'
                body={this.state.modalBody}
                hideSpinner={this.state.hideModalSpinner}
                closeFunc={this.onModalClose}
                instance={this}
               />)
        }

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
                      <Form.Control type='text' placeholder='bitcoincash:qqlrzp23w08434twmvr4fxw672whkjy0py26r63g3d' onChange={e => this.setState({ bchAddr: e.target.value })} value={this.state.bchAddr} />
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

  // This function is called when the modal is closed.
  onModalClose () {
    // _this.setState({ hideModal: true })

    if (_this.state.refreshOnClose) {
      _this.state.refreshBchBalance()
    }
  }

  async pasteFromClipboard (event) {
    try {
      // Capacitor Android app takes this code path.

      // Get the value from the clipboard.
      const { value } = await Clipboard.read()
      // console.log('value: ', value)

      // Set the value of the form.
      this.setState({ bchAddr: value })
    } catch (err) {
      // Browser implementation. Exit quietly.
    }
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

    try {
      // Clear the modal body
      _this.setState({ modalBody: '' })

      // Open the modal
      const modalBody = ['Preparing to send bch...']
      _this.setState({
        hideModal: false,
        modalBody
      })

      const amountBch = _this.state.amountBch

      if (amountBch < 0.00000546) throw new Error('Trying to send less than dust.')

      let bchAddr = _this.state.bchAddr
      let infoStr = `Sending ${amountBch} BCH ($${_this.state.amountUsd} USD) to ${bchAddr}`
      console.log(infoStr)

      // Update modal
      modalBody.push(infoStr)
      _this.setState({ modalBody })

      const wallet = _this.state.appData.bchWallet
      const bchjs = wallet.bchjs

      // If the address is an SLP address, convert it to a cash address.
      if (!bchAddr.includes(bchAddr)) {
        bchAddr = bchjs.SLP.Address.toCashAddress(bchAddr)
      }

      // Convert the BCH to satoshis
      const sats = bchjs.BitcoinCash.toSatoshi(amountBch)

      // Update the wallets UTXOs
      infoStr = 'Updating UTXOs...'
      console.log(infoStr)
      modalBody.push(infoStr)
      _this.setState({ modalBody })
      await wallet.getUtxos()

      const receivers = [{
        address: bchAddr,
        amountSat: sats
      }]
      const txid = await wallet.send(receivers)

      // Display TXID
      infoStr = `txid: ${txid}`
      console.log(infoStr)
      modalBody.push(infoStr)

      // Link to block explorer
      const explorerUrl = `https://blockchair.com/bitcoin-cash/transaction/${txid}`
      const explorerLink = (<a href={`${explorerUrl}`} target='_blank' rel='noreferrer'>Block Explorer</a>)
      modalBody.push(explorerLink)

      _this.setState({
        modalBody,
        hideModalSpinner: true,
        bchAddr: '',
        amountStr: '',
        refreshOnClose: true,
        amountUsd: 0,
        amountBch: 0
      })
    } catch (err) {
      console.log('Error in handleSendBch(): ', err)

      const modalBody = []
      modalBody.push(`Error trying to send BCH: ${err.message}`)

      // Print the error to the modal
      _this.setState({
        hideModal: false,
        modalBody,
        hideModalSpinner: true,
        refreshOnClose: false
      })
    }
  }
}

// Modal dedicated to the Send card.
function ModalTemplate (props) {
  // const [showSendModal, setShowSendModal] = useState(false)

  const handleClose = () => {
    props.instance.setState({ hideModal: true })

    // setShowSendModal(false)

    // If the parent component specified a function to execute at close, execute
    // it now.
    if (props.closeFunc) {
      props.closeFunc()
    }
  }

  // if (!props.hideModal) {
  //   // props.instance.setState({ hideModal: true })
  //
  //   setShowSendModal(true)
  // }

  // Allow other components to force the modal open if it was previously closed.
  // if (props.forceOpen) {
  //   if (!showSendModal) {
  //     setShowSendModal(true)
  //   }
  // }

  // const handleShow = () => setShow(true)

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              <BodyList body={props.body} />
              {props.hideSpinner ? null : <Spinner animation='border' />}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  )
}

function BodyList (props) {
  const items = props.body

  const listItems = []

  // Paragraphs
  for (let i = 0; i < items.length; i++) {
    listItems.push(<p key={items[i]}><code>{items[i]}</code></p>)
  }

  return (
    listItems
  )
}

export default SendCard
