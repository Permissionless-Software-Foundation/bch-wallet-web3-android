/*
  This Sweep component allows users to sweep a private key and transfer any
  BCH or SLP tokens into their wallet.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Form, Button, Modal, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import Sweep from 'bch-token-sweep'

// let _this

class SweepWif extends React.Component {
  constructor (props) {
    super()

    this.state = {
      appData: props.appData,
      wifToSweep: '',

      // Modal control
      showModal: false,
      statusMsg: '',
      hideSpinner: false,
      shouldRefreshOnModalClose: false
    }

    // Bind this to event handlers
    this.handleSweep = this.handleSweep.bind(this)
    this.updateWalletState = this.updateWalletState.bind(this)

    // _this = this
  }

  render () {
    // Generate the JSX for the modal.
    const modal = this.getModal()

    return (
      <>
        <Container>
          <Row>
            <Col style={{ textAlign: 'right' }}>
              <a href='https://youtu.be/QW9xixHaEJE' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faCircleQuestion} size='lg' />
              </a>
            </Col>
          </Row>

          <Row>
            <Col>
              <p>
                This View is used to 'sweep' a private key. This will transfer
                any BCH or SLP tokens from a paper wallet to your web wallet.
                Paper wallets are used to store BCH and tokens. You
                can <a href='https://paperwallet.fullstack.cash/' target='_blank' rel='noreferrer'>generate paper wallets here</a>.
              </p>
              <p>
                Paste the private key of a paper wallet below and click the button
                to sweep the funds. The private key must be in WIF format. It will
                start with the letter 'K' or 'L'.
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form>
                <Form.Group controlId='formWif' style={{ textAlign: 'center' }}>
                  <Form.Control
                    type='text'
                    placeholder='KzJqZxi5XSo36woCy7MFVNRPDpfp8x8FpkhRvrErKBBrDXRVY9Ft'
                    onChange={e => this.setState({ wifToSweep: e.target.value })}
                    value={this.state.wifToSweep}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <br />

          <Row style={{ textAlign: 'center' }}>
            <Col>
              <Button variant='info' onClick={(e) => this.handleSweep()}>Sweep</Button>
            </Col>
          </Row>
        </Container>

        {
          this.state.showModal
            ? modal
            : null
        }
      </>
    )
  }

  async handleSweep (event) {
    try {
      const wif = this.state.wifToSweep
      console.log(`Sweeping this WIF: ${wif}`)

      // Set the modal to its initial state.
      this.setState({
        showModal: true,
        hideSpinner: false,
        statusMsg: ''
      })

      // Input validation
      const isWIF = this.validateWIF(wif)
      if (!isWIF) {
        // throw new Error('Not a WIF key')
        this.setState({
          hideSpinner: true,
          statusMsg: 'Input is not a WIF private key.'
        })
        return
      }

      try {
        // const Sweep = this.state.appData.Sweep
        const walletWif = this.state.appData.bchWallet.walletInfo.privateKey
        // const bchjs = this.state.appData.bchWallet.bchjs
        const toAddr = this.state.appData.bchWallet.slpAddress

        // Instance the Sweep library
        const sweep = new Sweep(wif, walletWif, this.state.appData.bchWallet)
        await sweep.populateObjectFromNetwork()

        // Constructing the sweep transaction
        const hex = await sweep.sweepTo(toAddr)

        // return transactionHex

        // Broadcast the transaction to the network.
        // const txId = await sweeperLib.blockchain.broadcast(transactionHex)
        const txid = await this.state.appData.bchWallet.ar.sendTx(hex)

        // Generate an HTML status message with links to block explorers.
        const statusMsg = (
          <>
            <p>
              Sweep succeeded!
            </p>
            <p>
              Transaction ID: {txid}
            </p>
            <p>
              <a href={`https://blockchair.com/bitcoin-cash/transaction/${txid}`} target='_blank' rel='noreferrer'>TX on Blockchair BCH Block Explorer</a>
            </p>
            <p>
              <a href={`https://token.fullstack.cash/transactions/?txid=${txid}`} target='_blank' rel='noreferrer'>TX on token explorer</a>
            </p>
          </>
        )

        this.setState({
          hideSpinner: true,
          statusMsg,
          wifToSweep: ''
        })

        await this.updateWalletState()
      } catch (err) {
        this.setState({
          hideSpinner: true,
          statusMsg: (<b>{`Error: ${err.message}`}</b>)
        })
      }
    } catch (err) {
      console.error('Error in handleSweep(): ', err)
    }
  }

  validateWIF (WIF) {
    if (typeof WIF !== 'string') {
      return false
    }

    if (WIF.length !== 52) {
      return false
    }

    if (WIF[0] !== 'L' && WIF[0] !== 'K') {
      return false
    }

    return true
  }

  // Generate the info modal that is displayed when the button is clicked.
  getModal () {
    // const token = this.state.token
    // console.log(`token: ${JSON.stringify(token, null, 2)}`)

    return (
      <Modal show={this.state.showModal} size='lg' onHide={(e) => this.handleCloseModal(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Sweeping...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col style={{ textAlign: 'center' }}>
                Sweeping private key... {
                  this.state.hideSpinner ? null : <Spinner animation='border' />
                }
              </Col>
            </Row>
            <br />

            <Row>
              <Col style={{ textAlign: 'center' }}>
                {this.state.statusMsg}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    )
  }

  // This handler function is called when the modal is closed.
  async handleCloseModal () {
    this.setState({
      showModal: false
    })
  }

  // Update the wallet state. This probably needs to be refined.
  async updateWalletState () {
    const wallet = this.state.appData.bchWallet

    const bchBalance = await wallet.getBalance({ bchAddress: wallet.walletInfo.cashAddress })
    await wallet.initialize()
    const slpTokens = await wallet.listTokens(wallet.walletInfo.cashAddress)

    this.state.appData.updateBchWalletState({ walletObj: { bchBalance, slpTokens }, appData: this.state.appData })
  }
}

export default SweepWif
