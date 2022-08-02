/*
  This component renders as a button. When clicked, it opens up a modal
  for sending a quantity of tokens.
*/

// Global npm libraries
import React, { useState } from 'react'
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
        <Button variant='info' onClick={(e) => this.handleShowModal(this)}>Send</Button>
        {
          this.state.showModal
            ? modal
            : null
        }
      </>
    )
  }

  // Toggle the Info modal.
  handleShowModal (thisInstance) {
    thisInstance.setState({
      showModal: true
    })
  }

  // Generate the info modal that is displayed when the button is clicked.
  getModal () {
    const token = this.state.token
    // console.log(`token: ${JSON.stringify(token, null, 2)}`)

    return (
      <ModalTemplate instance={this} token={token} />
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
  handleGetMax (instance) {
    console.log('get max button clicked.')

    // const token = instance.state.token
    // console.log('token: ', token)

    instance.setState({
      sendQtyStr: instance.state.token.qty
    })
  }

  // Click handler that fires when the user clicks the 'Send' button.
  handleSendTokens (instance, handleClose) {
    console.log('Send button clicked.')

    try {
      instance.setState({
        statusMsg: 'Sending tokens...',
        hideSpinner: false
      })

      // const addr = instance.state.sendToAddress
      // let qty = instance.state.sendQtyStr
      //
      // // Validate the quantity
      // qty = parseFloat(qty)
      // if (isNaN(qty)) throw new Error('Invalid send quantity')
      //
      // instance.setState({
      //   statusMsg: 'Success!',
      //   hideSpinner: true
      // })
      //
      // handleClose()
    } catch (err) {
      console.error('Error in handleSendTokens(): ', err)

      instance.setState({
        statusMsg: `Error sending tokens: ${err.message}`,
        hideSpinner: true
      })
    }
  }
}

function ModalTemplate (props) {
  const [show, setShow] = useState(true)

  const handleClose = () => {
    setShow(false)
    props.instance.setState({ showModal: false })
  }

  return (
    <Modal show={show} size='lg' onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><FontAwesomeIcon icon={faPaperPlane} size='lg' /> Send Tokens: {props.token.ticker}</Modal.Title>
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
                    onChange={e => props.instance.setState({ sendToAddress: e.target.value })}
                    value={props.instance.state.sendToAddress}
                  />
                </Form.Group>
              </Form>
            </Col>

            <Col xs={2}>
              <FontAwesomeIcon
                icon={faPaste}
                size='lg'
                onClick={(e) => props.instance.pasteFromClipboard(e)}
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
                    onChange={e => props.instance.setState({ sendQtyStr: e.target.value })}
                    value={props.instance.state.sendQtyStr}
                  />
                </Form.Group>
              </Form>
            </Col>

            <Col xs={2}>
              <Button onClick={(e) => props.instance.handleGetMax(props.instance)}>Max</Button>
            </Col>
          </Row>
          <br />

          <Row>
            <Col style={{ textAlign: 'center' }}>
              <Button onClick={(e) => props.instance.handleSendTokens(props.instance, handleClose)}>Send</Button>
            </Col>
          </Row>

          <Row>
            <Col xs={10}>
              {props.instance.statusMsg}
            </Col>

            <Col xs={2}>
              {props.instance.hideSpinner ? <Spinner animation='border' /> : null}
            </Col>
          </Row>

        </Container>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  )
}

export default SentTokenButton
