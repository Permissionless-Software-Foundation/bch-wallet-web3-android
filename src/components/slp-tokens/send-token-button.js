/*
  This component renders as a button. When clicked, it opens up a modal
  for sending a quantity of tokens.
*/

// Global npm libraries
import React from 'react'
import { Button, Modal, Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPaste } from '@fortawesome/free-solid-svg-icons'
import { Clipboard } from '@capacitor/clipboard'

// let _this

class SentTokenButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      token: props.token,
      appData: props.appData,

      // Modal control
      showModal: false,
      statusMsg: '',
      hideSpinner: true,

      // Modal inputs
      sendToAddress: '',
      sendQtyStr: '',
      sendQtyNum: 0
    }

    // _this = this
  }

  render () {
    const modal = this.getModal()

    return (
      <>
        <Button variant='info' onClick={(e) => this.handleShowModal()}>Send</Button>
        {
          this.state.showModal
            ? modal
            : null
        }
      </>
    )
  }

  // Toggle the Info modal.
  handleShowModal () {
    this.setState({
      showModal: true
    })
  }

  handleCloseModal (instance) {
    // setShow(false)
    instance.setState({ showModal: false })
  }

  // Generate the info modal that is displayed when the button is clicked.
  getModal () {
    const token = this.state.token
    // console.log(`token: ${JSON.stringify(token, null, 2)}`)

    // return (
    //   <ModalTemplate instance={this} token={token} />
    // )

    return (
      <Modal show={this.state.showModal} size='lg' onHide={(e) => this.handleCloseModal(this)}>
        <Modal.Header closeButton>
          <Modal.Title><FontAwesomeIcon icon={faPaperPlane} size='lg' /> Send Tokens: {token.ticker}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col style={{ textAlign: 'center' }}>
                <b>SLP Address:</b>
              </Col>
            </Row>

            <Row>
              <Col xs={10}>
                <Form>
                  <Form.Group controlId='formBasicEmail' style={{ textAlign: 'center' }}>
                    <Form.Control
                      type='text'
                      placeholder='simpleledger:qqlrzp23w08434twmvr4fxw672whkjy0pyxpgpyg0n'
                      onChange={e => this.setState({ sendToAddress: e.target.value })}
                      value={this.state.sendToAddress}
                    />
                  </Form.Group>
                </Form>
              </Col>

              <Col xs={2}>
                <FontAwesomeIcon
                  icon={faPaste}
                  size='lg'
                  onClick={(e) => this.pasteFromClipboard(e)}
                />
              </Col>
            </Row>
            <br />

            <Row>
              <Col style={{ textAlign: 'center' }}>
                <b>Amount:</b>
              </Col>
            </Row>

            <Row>
              <Col xs={10}>
                <Form style={{ paddingBottom: '10px' }}>
                  <Form.Group controlId='formBasicEmail' style={{ textAlign: 'center' }}>
                    <Form.Control
                      type='text'
                      onChange={e => this.setState({ sendQtyStr: e.target.value })}
                      value={this.state.sendQtyStr}
                    />
                  </Form.Group>
                </Form>
              </Col>

              <Col xs={2}>
                <Button onClick={(e) => this.handleGetMax()}>Max</Button>
              </Col>
            </Row>
            <br />

            <Row>
              <Col style={{ textAlign: 'center' }}>
                <Button onClick={(e) => this.handleSendTokens(this)}>Send</Button>
              </Col>
            </Row>
            <br />

            <Row>
              <Col xs={10}>
                {this.state.statusMsg}
              </Col>

              <Col xs={2}>
                {this.state.hideSpinner ? null : <Spinner animation='border' />}
              </Col>
            </Row>

          </Container>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    )
  }

  async pasteFromClipboard (event) {
    try {
      // Capacitor Android app takes this code path.

      // Get the value from the clipboard.
      const { value } = await Clipboard.read()
      // console.log('value: ', value)

      // Set the value of the form.
      this.setState({ sendToAddress: value })
    } catch (err) {
      // Browser implementation. Exit quietly.
    }
  }

  // Click handler that fires when the user clicks the Max button.
  handleGetMax () {
    console.log('get max button clicked.')

    // const token = instance.state.token
    // console.log('token: ', token)

    this.setState({
      sendQtyStr: this.state.token.qty
    })
  }

  // Click handler that fires when the user clicks the 'Send' button.
  async handleSendTokens (instance) {
    console.log('Send button clicked.')

    try {
      instance.setState({
        statusMsg: 'Preparing to send tokens...',
        hideSpinner: false
      })

      // Validate the quantity
      let qty = instance.state.sendQtyStr
      qty = parseFloat(qty)
      if (isNaN(qty)) throw new Error('Invalid send quantity')

      const wallet = instance.state.appData.bchWallet
      const bchjs = wallet.bchjs

      // Validate the address
      let addr = instance.state.sendToAddress
      if (addr.includes('simpleledger')) {
        // Convert the address to a cash address.
        addr = bchjs.SLP.Address.toCashAddress(addr)
      }
      if (!addr.includes('bitcoincash')) throw new Error('Invalid address')

      // Update the wallets UTXOs
      let infoStr = 'Updating UTXOs...'
      console.log(infoStr)
      instance.setState({ statusMsg: infoStr })
      await wallet.getUtxos()

      const receiver = [{
        address: addr,
        tokenId: instance.state.token.tokenId,
        qty
      }]

      // Send the tokens
      infoStr = 'Generating and broadcasting transaction...'
      console.log(infoStr)
      instance.setState({ statusMsg: infoStr })

      const txid = await wallet.sendTokens(receiver)
      console.log(`Token sent. TXID: ${txid}`)

      instance.setState({
        statusMsg: (<p>Success! <a href={`https://token.fullstack.cash/transactions/?txid=${txid}`} target='_blank' rel='noreferrer'>See on Block Explorer</a></p>),
        hideSpinner: true,
        sendQtyStr: '',
        sendToAddress: ''
      })

      // instance.handleCloseModal(instance)
    } catch (err) {
      console.error('Error in handleSendTokens(): ', err)

      instance.setState({
        statusMsg: `Error sending tokens: ${err.message}`,
        hideSpinner: true
      })
    }
  }
}

export default SentTokenButton
