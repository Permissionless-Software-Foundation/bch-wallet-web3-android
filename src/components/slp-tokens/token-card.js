/*
  This Card component summarizes an SLP token.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Jdenticon from '@chris.troutner/react-jdenticon'
// import axios from 'axios'

// Local libraries
import InfoButton from './info-button'
import SendTokenButton from './send-token-button'

// function TokenCard2(props) {
//
// }

class TokenCard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData,
      token: props.token,
      shouldCheckIcon: true, // Determines if the app should try to lookup the token icon.

      // This function is passed from the parent Token View. It's called to
      // refresh the tokens data from the blockchain, after a successful
      // token send transaction is broadcast.
      refreshTokens: props.refreshTokens
    }

    // console.log('appData: ', props.appData)
  }

  render () {
    const defaultIcon = (<Jdenticon size='100' value={this.state.token.tokenId} />)
    console.log(`token-card rendered for token ID ${this.state.token.tokenId} with balance ${this.state.token.qty}`)

    return (
      <>
        <Col xs={12} sm={6} lg={4} style={{ padding: '25px' }}>
          <Card>
            <Card.Body style={{ textAlign: 'center' }}>
              {
                this.state.token.icon
                  ? this.state.token.icon
                  : defaultIcon
              }
              <Card.Title style={{ textAlign: 'center' }}>
                <h4>{this.state.token.ticker}</h4>
              </Card.Title>

              <Container>
                <Row>
                  <Col>
                    {this.state.token.name}
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col>Balance:</Col>
                  <Col>{this.state.token.qty}</Col>
                </Row>
                <br />

                <Row>
                  <Col>
                    <InfoButton token={this.state.token} />
                  </Col>
                  <Col>
                    <SendTokenButton
                      token={this.state.token}
                      appData={this.state.appData}
                      refreshTokens={this.state.refreshTokens}
                    />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </>
    )
  }
}

export default TokenCard
