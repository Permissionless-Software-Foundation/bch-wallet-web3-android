/*
  This component controls sending of BCH.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPaste } from '@fortawesome/free-solid-svg-icons'

let _this

class SendCard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData
    }

    _this = this
  }

  render () {
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>
              <h2><FontAwesomeIcon icon={faPaperPlane} size='lg' /> Send</h2>
            </Card.Title>
            <br />

            <Container>
              <Row>
                <Col style={{ textAlign: 'center' }}>
                  <b>BCH Address:</b>
                </Col>
              </Row>

              <Row>
                <Col xs={10}>
                  <Form>
                    <Form.Group controlId='formBasicEmail' style={{ textAlign: 'center' }}>
                      <Form.Control type='text' placeholder='bitcoincash:qqlrzp23w08434twmvr4fxw672whkjy0py26r63g3d' onChange={e => this.setState({ textInput: e.target.value })} />
                    </Form.Group>
                  </Form>
                </Col>

                <Col xs={2}>
                  <FontAwesomeIcon icon={faPaste} size='lg' onClick={(e) => _this.pasteFromClipboard(e)} />
                </Col>
              </Row>
              <br />

              <Row>
                <Col style={{ textAlign: 'center' }}>
                  <b>Amount:</b>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Form>
                    <Form.Group controlId='formBasicEmail' style={{ textAlign: 'center' }}>
                      <Form.Control type='text' onChange={e => this.setState({ textInput: e.target.value })} />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <br />

              <Row>
                <Col style={{ textAlign: 'center' }}>
                  <Button>Send</Button>
                </Col>
              </Row>

            </Container>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default SendCard
