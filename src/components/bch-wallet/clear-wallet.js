/*
  This Card component is used to clear the Local Storage and reset the wallet.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

let _this

class WalletClear extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      delMnemonic: props.delMnemonic
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
                      <FontAwesomeIcon icon={faTriangleExclamation} />{' '}
                      <span>Clear Local Storage</span>
                    </h2>
                  </Card.Title>

                  <Card.Text style={{ textAlign: 'center' }}>
                    Clicking the button below will clear the Local Storage, which
                    will reload the app with a newly created wallet.
                    <br />
                    <b>
                      Be sure to write down your 12-word mnemonic to back
                      up your wallet before clicking the button!
                    </b>.
                    <br /><br />
                    <Button variant='danger' onClick={this.handleClearLocalStorage}>
                      Delete Wallet
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }

  handleClearLocalStorage () {
    console.log('Deleting wallet and reloading page.')

    // Delete the mnemonic from Local Storage
    _this.state.delMnemonic()

    // Reload the app.
    window.location.reload()
  }
}

export default WalletClear
