/*
  Component for signing a message with a WIF private key.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class SignMessage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData,
      output: '',
      textInput: '',
      wallet: props.appData.wallet,
      wif: props.appData.wallet.walletInfo.privateKey,
      msg: '',
      sig: false,
      bchAddr: '',
      slpAddr: ''
    }

    // Bind 'this' object to all subfunctions.
    this.handleSignMessage = this.handleSignMessage.bind(this)
  }

  render () {
    return (

      <>
        <Container>
          <Row>
            <Col>
              <p>
                This view allows you cryptographically sign a message with your
                wallet. These signatures are used in a wide range of applications,
                such as gaining access to
                the <a href='https://t.me/psf_vip' target='_blank' rel='noreferrer'>PSF VIP Telegram channel</a>.
              </p>
              <p>
                Enter any message into the form below and click the button. This
                view will generate a cryptographic signature.
              </p>
            </Col>
          </Row>
          <Row>
            <Col className='text-break'>
              <Form onSubmit={this.handleSignMessage}>
                <Form.Group className='mb-3' controlId='message' onSubmit={e => console.log('form submitted')}>
                  <Form.Label><b>Enter a message to sign.</b></Form.Label>
                  <Form.Control type='text' placeholder='' onChange={e => this.setState({ msg: e.target.value })} />
                </Form.Group>

                <Button variant='primary' onClick={this.handleSignMessage}>
                  Sign Message
                </Button>
              </Form>
            </Col>
          </Row>
          <br />
          <Row>
            <Col style={{ textAlign: 'center' }}>
              {this.state.output}
            </Col>
          </Row>
        </Container>
      </>
    )
  }

  handleSignMessage (event) {
    try {
      event.preventDefault()

      const { wif, msg } = this.state
      const bchjs = this.state.wallet.bchjs
      // console.log('bchjs: ', bchjs)

      const sig = bchjs.BitcoinCash.signMessageWithPrivKey(wif, msg)

      const ecPair = bchjs.ECPair.fromWIF(wif)
      const bchAddr = bchjs.ECPair.toCashAddress(ecPair)
      const slpAddr = bchjs.SLP.Address.toSLPAddress(bchAddr)

      const output = (
        <>
          <p><b>Signature:</b> {sig}</p>
          <p><b>BCH Address:</b> {bchAddr}</p>
          <p><b>SLP Address:</b> {slpAddr}</p>
        </>
      )

      this.setState({
        output
      })
    } catch (err) {
      console.log('Error in handleSignMessage(): ', err)
      this.setState({
        balance: (<p style={{ color: 'red' }}>{`Error: ${err.message}`}</p>)
      })
    }
  }
}

export default SignMessage
