/*
  This component renders as a button. When clicked, it opens a modal that
  displays information about the token.

  This is a functional component with as little state as possible.
*/

// Global npm libraries
import React, { useState } from 'react'
import { Button, Modal, Container, Row, Col } from 'react-bootstrap'

// Takes a string as input. If it matches a pattern for a link, a JSX object is
// returned with a link. Otherwise the original string is returned.
function linkIfUrl (url) {
  // Convert the URL into a link if it contains 'http'
  if (url.includes('http')) {
    url = (<a href={url} target='_blank' rel='noreferrer'>{url}</a>)

    //
  } else if (url.includes('ipfs://')) {
    // Convert to a Filecoin link if its an IPFS reference.

    const cid = url.substring(7)
    url = (<a href={`https://${cid}.ipfs.dweb.link/data.json`} target='_blank' rel='noreferrer'>{url}</a>)
  }

  return url
}

function InfoButton (props) {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    // props.instance.setState({ showModal: false })
  }

  const handleOpen = () => {
    setShow(true)
  }

  // Convert the url property of the token to a link, if it matches common patterns.
  let url = props.token.url
  url = linkIfUrl(props.token.url)

  return (
    <>
      <Button variant='info' onClick={handleOpen}>Info</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Token Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={4}><b>Ticker</b>:</Col>
              <Col xs={8}>{props.token.ticker}</Col>
            </Row>

            <Row style={{ backgroundColor: '#eee' }}>
              <Col xs={4}><b>Name</b>:</Col>
              <Col xs={8}>{props.token.name}</Col>
            </Row>

            <Row>
              <Col xs={4}><b>Token ID</b>:</Col>
              <Col xs={8} style={{ wordBreak: 'break-all' }}>{props.token.tokenId}</Col>
            </Row>

            <Row style={{ backgroundColor: '#eee' }}>
              <Col xs={4}><b>Decimals</b>:</Col>
              <Col xs={8}>{props.token.decimals}</Col>
            </Row>

            <Row>
              <Col xs={4}><b>Token Type</b>:</Col>
              <Col xs={8}>{props.token.tokenType}</Col>
            </Row>

            <Row style={{ backgroundColor: '#eee', wordBreak: 'break-all' }}>
              <Col xs={4}><b>URL</b>:</Col>
              <Col xs={8}>{url}</Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  )
}

export default InfoButton
