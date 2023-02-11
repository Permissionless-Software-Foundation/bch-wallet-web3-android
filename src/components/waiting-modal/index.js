/*
  This 'Waiting Modal' component displays a spinner animation and a status log.
  It's used to inform the user that the app is waiting for something, and to
  display progress.
*/

// Global npm libraries
import React, { useState } from 'react'
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'

function ModalTemplate (props) {
  // State
  const [show, setShow] = useState(true)

  // Dependency injection of props
  const denyClose = props.denyClose // Determins if user is allowed to close modal.
  const closeFunc = props.closeFunc // Optional function called after modal is closed.
  const heading = props.heading // Title of the modal
  const body = props.body // Body of the modal
  const hideSpinner = props.hideSpinner // Hide the animated spinner

  // This function is called when the modal is closed
  const handleClose = () => {
    console.log(`props.denyClose: ${denyClose}`)
    if (denyClose) return

    setShow(false)

    if (closeFunc) {
      closeFunc()
    }
  }
  // const handleShow = () => setShow(true)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              <BodyList body={body} />
              {hideSpinner ? null : <Spinner animation='border' />}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  )
}

// This function populates the body of the modal. It expects props.body to be
// an array of strings.
function BodyList (props) {
  const items = props.body
  // console.log('BodyList items: ', items)

  const listItems = []

  // Paragraphs
  for (let i = 0; i < items.length; i++) {
    listItems.push(<p key={items[i]}><code>{items[i]}</code></p>)
  }

  return (
    listItems
  )
}

// export default WaitingModal
export default ModalTemplate
