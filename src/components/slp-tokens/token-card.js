/*
  This Card component summarizes an SLP token.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import Jdenticon from '@chris.troutner/react-jdenticon'
import axios from 'axios'

// Local libraries
import InfoButton from './info-button'

class TokenCard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData,
      token: props.token,
      icon: (<Jdenticon size='100' value={props.token.tokenId} />)
    }

    // console.log(`token: ${JSON.stringify(props.token, null, 2)}`)
  }

  // After the initial token has been loaded, this function tries to figure
  // out if the token has a token icon. If it does, the icon is lazy-loaded.
  async componentDidMount () {
    const token = this.state.token
    let tokenFound = false

    // console.log('this.state.appData: ', this.state.appData)

    // If the URL property of the token has an IPFS CID, then it probably
    // follows the PS002 specification for tokens. Download the token icon
    // and replace the Jdenticon automatically-generated icon.
    if (token.url.includes('ipfs://')) {
      const wallet = this.state.appData.bchWallet

      // Retrieve token data from psf-slp-indexer.
      const tokenData = await wallet.getTokenData(token.tokenId)
      // console.log(`tokenData: ${JSON.stringify(tokenData, null, 2)}`)

      // If the token has mutable data, then try to retrieve it from IPFS.
      if (tokenData.mutableData && tokenData.mutableData.includes('ipfs://')) {
        const cid = tokenData.mutableData.substring(7)
        // console.log('cid')

        // Retrieve the mutable data from Filecoin/IPFS.
        const url = `https://${cid}.ipfs.dweb.link/data.json`
        const result = await axios.get(url)

        const mutableData = result.data
        // console.log(`mutableData: ${JSON.stringify(mutableData, null, 2)}`)

        const tokenIcon = mutableData.tokenIcon

        const newIcon = (
          <Card.Img src={tokenIcon} style={{ width: '100px' }} />
        )

        tokenFound = true

        // Replace the auto-generated icon with the one specified in the mutable data.
        this.setState({
          icon: newIcon
        })
      }
    }

    if (!tokenFound) {
      // Check the slp-token-icon GitHub repository for an icon:
      // https://github.com/kosinusbch/slp-token-icons

      const url = `https://tokens.bch.sx/100/${token.tokenId}.png`
      // console.log('url: ', url)

      // Check to see if icon exists. If it doesn't, axios will throw an error
      // and this function can exit.
      try {
        await axios.get(url)
      } catch (err) {
        /* exit quietly */
        return
      }

      const newIcon = (
        <Card.Img src={url} style={{ width: '100px' }} />
      )

      // Replace the auto-generated icon with the one specified in the mutable data.
      this.setState({
        icon: newIcon
      })
    }
  }

  render () {
    return (
      <>
        <Col xs={12} sm={6} lg={4} style={{ padding: '25px' }}>
          <Card>
            <Card.Body style={{ textAlign: 'center' }}>
              {this.state.icon}
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
