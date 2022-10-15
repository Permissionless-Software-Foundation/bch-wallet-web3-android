/*
  This 'Waiting Modal' component displays a spinner animation and a status log.
  It's used to inform the user that the app is waiting for something, and to
  display progress.
*/

// Global npm libraries
import React, { useState } from 'react'
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'

function ModalTemplate (props) {
  const [show, setShow] = useState(true)

  const handleClose = () => {
    // Refuse to close the modal if denyClose is set.
    console.log(`props.denyClose: ${props.denyClose}`)
    if (props.denyClose) return

    setShow(false)

    if (props.closeFunc) {
      props.closeFunc()
    }
  }

  // const handleShow = () => setShow(true)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              <BodyList body={props.body} />
              {props.hideSpinner ? null : <Spinner animation='border' />}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  )
}

function BodyList (props) {
  const items = props.body

  const listItems = []

  // Paragraphs
  for (let i = 0; i < items.length; i++) {
    // Generate a unique key for each entry.
    const rndNum = Math.floor(Math.random() * 1000)
    const key = `${items[i].toString()}${rndNum}`
    // console.log(`Dialog key: ${key}`)

    listItems.push(<p key={key}><code>{items[i]}</code></p>)
  }

  return (
    listItems
  )
}

// export default WaitingModal
export default ModalTemplate
