/*
  A footer section for the SPA
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const IPFS_CID = 'bafybeiff7sjpdizarbtjgc3ftefyzndggsx3uxqs7l42ruzcwdkbuld6eq'

class Footer extends React.Component {
  render () {
    return (
      <Container style={{ backgroundColor: '#ddd' }}>
        <Row style={{ padding: '25px' }}>
          <Col>
            <h6>Site Mirrors</h6>
            <ul>
              <li><a href='https://troutnfts.com' target='_blank' rel='noreferrer'>troutnfts.com</a></li>
              <li><a href={`https://${IPFS_CID}.ipfs.dweb.link/`} target='_blank' rel='noreferrer'>Filecoin</a></li>
            </ul>
          </Col>

          <Col />

          <Col>
            <h6>Source Code</h6>
            <ul>
              <li><a href='https://github.com/christroutner/nft-browser-v2' target='_blank' rel='noreferrer'>GitHub</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Footer
