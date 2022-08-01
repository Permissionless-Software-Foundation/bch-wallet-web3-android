/*
  This component contains a drop-down form that lets the user select from
  a range of Global Back End servers.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

// Local libraries
// import GistServers from '../../services/gist-servers'

let _this

class ServerSelect extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      menuHandler: props.menuHandler
    }

    _this = this
  }

  render () {
    return (
      <Container>
        <hr />
        <Row>
          <Col style={{ textAlign: 'center', padding: '25px' }}>
            <br />
            <h5>
              Having trouble loading? Try selecting a different back-end server.
            </h5>
            <Button variant='warning' onClick={this.handleServerSelect}>Select a different back end server</Button>
            <br />
          </Col>
        </Row>
      </Container>
    )
  }

  // This is a click handler for the server select button. It brings up the
  // server selection View.
  handleServerSelect () {
    console.log('This function should navigate to the server selection view.')

    _this.state.menuHandler(100)
  }
}

export default ServerSelect
