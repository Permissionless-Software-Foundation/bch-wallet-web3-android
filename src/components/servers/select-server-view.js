/*
  This component is a View that allows the user to select a back end server
  from a list of servers.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

class ServerSelectView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData
    }
  }

  render () {
    // console.log('this.state.appData: ', this.state.appData)
    const servers = this.state.appData.servers

    // Loop through each server in the list
    const serverList = []
    for (let i = 0; i < servers.length; i++) {
      const thisServer = servers[i]

      const serverComponent = this.singleServer(thisServer, i)

      serverList.push(serverComponent)
    }

    return (
      <>
        <Container>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              <h2>
                Select Alternative Server
              </h2>
              <p>
                Select an alternative server below. The app will reload and use
                the selected server.
              </p>
            </Col>
          </Row>
          <br />

          {serverList}
        </Container>
      </>
    )
  }

  // Generate the HTML to display and select a server.
  singleServer (server, i) {
    const isEven = i % 2

    const backgroundColor = isEven ? '#eee' : '#fff'

    return (
      <div key={`server-${i}`}>
        <Row
          style={{
            padding: '25px',
            backgroundColor
          }}
        >
          <Col xs={4}>
            <Button id={server.value} onClick={this.handleReloadServer}>Select</Button>
          </Col>

          <Col xs={8}>
            {server.label}
          </Col>
        </Row>
      </div>
    )
  }

  // Click handler for the button. Reloads the app using the selected back-end server.
  handleReloadServer (event) {
    const target = event.target.id
    console.log('server target: ', target)

    window.location.href = `/?restURL=${target}`
  }
}

export default ServerSelectView
