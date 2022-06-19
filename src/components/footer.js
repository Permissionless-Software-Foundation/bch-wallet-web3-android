/*
  A footer section for the SPA
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const IPFS_CID = 'bafybeie6gh5bngwne63tycok3okrh5i6dxt7xaoby62psjkvt7n7pl2ou4'

class Footer extends React.Component {
  render () {
    return (
      <Container style={{ backgroundColor: '#ddd' }}>
        <Row style={{ padding: '25px' }}>
          <Col>
            <h6>Site Mirrors</h6>
            <ul>
              <li><a href={`https://${IPFS_CID}.ipfs.dweb.link/`} target='_blank' rel='noreferrer'>Filecoin</a></li>
            </ul>
          </Col>

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
