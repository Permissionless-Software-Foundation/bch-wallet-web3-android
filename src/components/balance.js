/*
  Component for looking up the balance of a BCH address.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'

let _this

class GetBalance extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      balance: '',
      textInput: '',
      wallet: props.wallet
    }

    _this = this
  }

  render () {
    return (

      <>
        <Container>
          <Row>
            <Col className='text-break' style={{ textAlign: 'center' }}>
              <Form>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Enter a BCH address to check the balance.</Form.Label>
                  <Form.Control type='text' placeholder='bitcoincash:qqlrzp23w08434twmvr4fxw672whkjy0py26r63g3d' onChange={e => this.setState({ textInput: e.target.value })} />
                </Form.Group>

                <Button variant='primary' onClick={this.handleGetBalance}>
                  Check Balance
                </Button>
              </Form>
            </Col>
          </Row>
          <br />
          <Row>
            <Col style={{ textAlign: 'center' }}>
              {this.state.balance}
            </Col>
          </Row>
        </Container>
      </>
    )
  }

  async handleGetBalance (event) {
    try {
      const textInput = _this.state.textInput

      // Exit on invalid input
      if (!textInput) return
      if (!textInput.includes('bitcoincash:')) return

      _this.setState({
        balance: (<span>Retrieving balance... <Spinner animation='border' /></span>)
      })

      const balance = await _this.state.wallet.getBalance(textInput)
      console.log('balance: ', balance)

      const bchBalance = _this.state.wallet.bchjs.BitcoinCash.toBitcoinCash(balance)

      _this.setState({
        balance: `Balance: ${balance} sats, ${bchBalance} BCH`
      })
    } catch (err) {
      _this.setState({
        balance: `Error: ${err.message}`
      })
    }
  }
}

export default GetBalance
