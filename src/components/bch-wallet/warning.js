/*
  This component is a visual warning against storing large sums of money in
  a web wallet.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

class WebWalletWarning extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

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
                      <span>Web Wallets are Insecure</span>
                    </h2>
                  </Card.Title>

                  <Card.Text style={{ textAlign: 'center' }}>
                    This is an open source, non-custodial web wallet
                    supporting Bitcoin Cash (BCH) and SLP tokens.
                    It is optimized for convenience and not security.
                    <br />
                    <b>Do not store large amounts of money on a web wallet.
                    </b>
                  </Card.Text>
                </Card.Body>
              </Card>

            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default WebWalletWarning
