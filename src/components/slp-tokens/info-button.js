/*
  This component renders as a button. When clicked, it opens a modal that
  displays information about the token.
*/

// Global npm libraries
import React, { useState } from 'react'
import { Button, Modal, Container, Row, Col } from 'react-bootstrap'

class InfoButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      token: props.token,
      showModal: false
    }
  }

  render () {
    const modal = this.getModal()

    return (
      <>
        <Button variant='info' onClick={(e) => this.handleShowModal(this)}>Info</Button>
        {
          this.state.showModal
            ? modal
            : null
        }
      </>
    )
  }

  // Toggle the Info modal.
  handleShowModal (thisInstance) {
    thisInstance.setState({
      showModal: true
    })
  }

  // Generate the info modal that is displayed when the button is clicked.
  getModal () {
    const token = this.state.token
    // console.log(`token: ${JSON.stringify(token, null, 2)}`)

    return (
      <ModalTemplate instance={this} token={token} />
    )
  }
}

function ModalTemplate (props) {
  const [show, setShow] = useState(true)

  const handleClose = () => {
    setShow(false)
    props.instance.setState({ showModal: false })
  }

  let url = props.token.url

  // Convert the URL into a link if it contains 'http'
  if (url.includes('http')) {
    url = (<a href={url} target='_blank' rel='noreferrer'>{url}</a>)

    //
  } else if (url.includes('ipfs://')) {
    // Convert to a Filecoin link if its an IPFS reference.

    const cid = url.substring(7)
    url = (<a href={`https://${cid}.ipfs.dweb.link/data.json`} target='_blank' rel='noreferrer'>{url}</a>)
  }

  return (
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
  )
}

export default InfoButton
