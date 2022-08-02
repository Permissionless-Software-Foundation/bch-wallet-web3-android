/*
  This component allows the user to import a new wallet using a 12-word mnemonic.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport, faPaste } from '@fortawesome/free-solid-svg-icons'
import { Clipboard } from '@capacitor/clipboard'

let _this

class WalletImport extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      newMnemonic: '',
      bchWallet: props.bchWallet,
      setMnemonic: props.setMnemonic
    }

    _this = this
  }

  render () {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center' }}>
                    <h2>
                      <FontAwesomeIcon icon={faFileExport} />{' '}
                      <span>Import Wallet</span>
                    </h2>
                  </Card.Title>

                  <Card.Text style={{ textAlign: 'center' }}>
                    Enter a 12 word mnemonic below to import your wallet into
                    this app. The app will reload and use the new mnemonic.
                  </Card.Text>

                  <Container>
                    <Row>
                      <Col xs={10} className='text-break' style={{ textAlign: 'center' }}>
                        <Form>
                          <Form.Group className='mb-3' controlId='formImportWallet'>
                            <Form.Control
                              type='text'
                              value={this.state.newMnemonic}
                              onChange={this.handleImportMnemonic}
                            />
                          </Form.Group>
                        </Form>
                      </Col>

                      <Col xs={2}>
                        <FontAwesomeIcon
                          icon={faPaste}
                          size='lg'
                          onClick={(e) => _this.pasteFromClipboard(e)}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col style={{ textAlign: 'center' }}>
                        <Button variant='primary' onClick={this.handleImportWallet}>
                          Import
                        </Button>
                      </Col>
                    </Row>

                    <br />
                    <Row>
                      <Col style={{ textAlign: 'center' }}>
                        {this.state.balance}
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

  // This event handler is triggered as the user enters text into the Import
  // Wallet text box.
  async handleImportMnemonic (event) {
    const inputStr = event.target.value

    // Force the string to be all lower case
    const formattedInput = inputStr.toLowerCase()

    _this.setState({ newMnemonic: formattedInput })
  }

  async pasteFromClipboard (event) {
    try {
      // Capacitor Android app takes this code path.

      // Get the value from the clipboard.
      const { value } = await Clipboard.read()
      // console.log('value: ', value)

      // Set the value of the form.
      this.setState({ newMnemonic: value })
    } catch (err) {
      // Browser implementation. Exit quietly.
    }
  }

  // Ensure the mnemonic is valid. If it is, then replace the current mnemonic
  // in LocalStorage and reload the page.
  async handleImportWallet (event) {
    const mnemonic = _this.state.newMnemonic
    const wallet = _this.state.bchWallet
    const bchjs = wallet.bchjs

    // Verify the mnemonic is valid.
    const isValid = bchjs.Mnemonic.validate(mnemonic, bchjs.Mnemonic.wordLists().english)
    if (isValid.includes('is not in wordlist')) {
      console.log('Mnemonic is NOT valid')
    } else {
      console.log('Mnemonic is valid')
    }

    // Replace the old mnemonic in LocalStorage with the new one.
    _this.state.setMnemonic(mnemonic)

    // Reload the app.
    window.location.reload()
  }
}

export default WalletImport
