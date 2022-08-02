/*
  This is the 'Token View'. It displays the SLP tokens in the wallet.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// Local libraries
import TokenCard from './token-card'
import RefreshTokenBalance from './refresh-tokens'

let _this

class SlpTokens extends React.Component {
  constructor (props) {
    super(props)

    // Create a reference to the Refresh button.
    this.refreshTokenButtonRef = React.createRef()

    this.state = {
      appData: props.appData
    }

    _this = this
  }

  render () {
    const tokenCards = this.generateCards()

    return (
      <>
        <Container>
          <Row>
            <Col xs={6}>
              <RefreshTokenBalance
                appData={this.state.appData}
                ref={this.refreshTokenButtonRef}
              />
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

  // This function is triggered when the token balance needs to be refreshed
  // from the blockchain.
  // This needs to happen after sending a token, to reflect the changed balance
  // within the wallet app.
  // This function trigger the on-click function within the refresh-tokens.js button.
  refreshTokens () {
    _this.refreshTokenButtonRef.current.handleRefreshBalance()
  }

  // This function generates a Token Card for each token in the wallet.
  generateCards () {
    // console.log(`generateCards() shouldRefreshTokens: ${this.state.shouldRefreshTokens}`)

    const tokens = this.state.appData.bchWalletState.slpTokens

    const tokenCards = []

    for (let i = 0; i < tokens.length; i++) {
      const thisToken = tokens[i]
      // console.log(`thisToken: ${JSON.stringify(thisToken, null, 2)}`)

      const thisTokenCard = (
        <TokenCard
          appData={this.state.appData}
          token={thisToken}
          key={`${thisToken.tokenId}`}
          refreshTokens={this.refreshTokens}
        />
      )
      tokenCards.push(thisTokenCard)
    }

    return tokenCards
  }
}

export default SlpTokens
