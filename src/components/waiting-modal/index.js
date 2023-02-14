/*
  This 'Waiting Modal' component displays a spinner animation and a status log.
  It's used to inform the user that the app is waiting for something, and to
  display progress.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'

function ModalTemplate (props) {
  // State
  // const [show, setShow] = useState(true)

  // Dependency injection of props
  const denyClose = props.denyClose // Determins if user is allowed to close modal.
  const closeFunc = props.closeFunc // Optional function called after modal is closed.
  const heading = props.heading // Title of the modal
  const body = props.body // Body of the modal
  const hideSpinner = props.hideSpinner // Hide the animated spinner
  const closeModalData = props.closeModalData

  // This function is called when the modal is closed
  const handleClose = () => {
    // console.log(`props.denyClose: ${denyClose}`)
    if (denyClose) return

    // setShow(false)

    if (closeFunc) {
      console.log('Waiting model executing handleClose(). closeModalData: ', closeModalData)
      closeFunc(closeModalData)
    }
  }

  // const handleShow = () => setShow(true)

  return (
    <Modal show onHide={handleClose}>
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
