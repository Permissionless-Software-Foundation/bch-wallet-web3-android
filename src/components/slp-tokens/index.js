/*
  This View displays the SLP tokens in the wallet.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

// Local libraries
import TokenCard from './token-card'

class SlpTokens extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData
    }
  }

  render () {
    const tokenCards = this.generateCards()

    return (
      <>
        <Container>
          <Row>
            <Col xs={6}>
              <Button variant='success'><FontAwesomeIcon icon={faRedo} size='lg' /> Refresh</Button>
            </Col>
            <Col xs={6} />
          </Row>
          <br />

          <Row>
            {tokenCards}
          </Row>

        </Container>
      </>
    )
  }

  // This function generates a Token Card for each token in the wallet.
  generateCards () {
    const tokens = this.state.appData.bchWalletState.slpTokens

    const tokenCards = []

    for (let i = 0; i < tokens.length; i++) {
      const thisToken = tokens[i]

      const thisTokenCard = <TokenCard appData={this.state.appData} token={thisToken} key={`token-${i}`} />
      tokenCards.push(thisTokenCard)
    }

    return tokenCards
  }
}

export default SlpTokens
