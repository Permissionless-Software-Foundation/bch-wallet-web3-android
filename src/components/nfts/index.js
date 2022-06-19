/*
  This is a top level component for displaying the NFTs.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// Local libraries
import NFTCard from './nft-card'

class NFTs extends React.Component {
  constructor (props) {
    super(props)

    console.log('props passed to NFT component: ', props)

    this.groupData = this.props.tokens.groupData
    this.nftData = this.props.tokens.nftData

    this.state = {
      nfts: []
    }
  }

  async componentDidMount () {
    // console.log('NFT component didMount(). nftData: ', this.nftData)

    const nfts = []
    for (let i = 0; i < this.nftData.length; i++) {
      nfts.push(<NFTCard key={`nft${i}`} nftData={this.nftData[i]} />)
    }

    this.setState({
      nfts
    })
  }

  render () {
    // Load spinner at startup while the wallet is being initialized.
    return (
      <>
        <Container>
          <Row>
            <Col className="text-break" style={{ textAlign: 'center' }}>
              <p>Loading NFTs associated with Group token{' '}
                <a
                  href={`https://token.fullstack.cash/?tokenid=${this.groupData.tokenId}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {this.groupData.tokenId}
                </a>
              </p>
            </Col>
          </Row>
          <Row><hr /></Row>
          {this.state.nfts}
        </Container>
      </>
    )
  }
}

export default NFTs
