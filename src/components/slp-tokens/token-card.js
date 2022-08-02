/*
  This Card component summarizes an SLP token.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import Jdenticon from '@chris.troutner/react-jdenticon'

class TokenCard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData,
      token: props.token
    }

    // console.log(`token: ${JSON.stringify(props.token, null, 2)}`)
  }

  render () {
    return (
      <>
        <Col xs={12} sm={6} lg={4} style={{ padding: '25px' }}>
          <Card>
            <Card.Body style={{ textAlign: 'center' }}>
              <Jdenticon size='100' value={this.state.token.tokenId} />
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
                    <Button variant='info'>Info</Button>
                  </Col>
                  <Col>
                    <Button>Send</Button>
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
