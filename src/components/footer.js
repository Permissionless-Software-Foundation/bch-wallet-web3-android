/*
  A footer section for the SPA
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const IPFS_CID = 'bafybeibkck6ylwqmpkqglvsvb7wc5xecb65uypg7fbcembuj7u4xuh2evq'

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
              <li><a href='https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-spa' target='_blank' rel='noreferrer'>GitHub</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Footer
