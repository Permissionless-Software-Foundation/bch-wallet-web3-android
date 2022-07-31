/*
  This component contains a drop-down form that lets the user select from
  a range of Global Back End servers.
*/

// Global npm libraries
import React from 'react'
// import Select from 'react-dropdown-select'
import { Container, Row, Col, Button } from 'react-bootstrap'

// Local libraries
import GistServers from '../../services/gist-servers'

const defaultOptions = [
  { value: 'https://free-bch.fullstack.cash', label: 'https://free-bch.fullstack.cash' },
  { value: 'https://bc01-ca-bch-consumer.fullstackcash.nl', label: 'https://bc01-ca-bch-consumer.fullstackcash.nl' },
  { value: 'https://pdx01-usa-bch-consumer.fullstackcash.nl', label: 'https://pdx01-usa-bch-consumer.fullstackcash.nl' },
  { value: 'https://wa-usa-bch-consumer.fullstackcash.nl', label: 'https://wa-usa-bch-consumer.fullstackcash.nl' }
]

let _this

class ServerSelect extends React.Component {
  constructor (props) {
    super(props)

    this.props = props
    // this.wallet = props.wallet

    this.state = {
      options: defaultOptions,
      menuHandler: props.menuHandler
    }

    _this = this
  }

  // This is called when the a new drop-down item is selected.
  selectServer (event) {
    console.log('event.target.value: ', event.target.value)

    const value = event.target.value

    if (!value) return

    window.location.href = `/?restURL=${value}`
  }

  render () {
    const items = []
    for (let i = 0; i < this.state.options.length; i++) {
      const thisServer = this.state.options[i]

      items.push(<option key={`server-${i}`} value={thisServer.value}>{thisServer.label}</option>)
    }

    // return (
    //   <Container>
    //     <hr />
    //     <Row>
    //       <Col>
    //         <br />
    //         <h5 style={{ textAlign: 'center' }}>
    //           Having trouble loading? Try selecting a different back-end server.
    //         </h5>
    //         <Form.Select onChange={(values) => this.selectServer(values)}>
    //           <option>{this.props.queryParamExists ? (`${this.props.displayUrl}`) : ('Choose a back-end server')}</option>
    //           {items}
    //         </Form.Select>
    //         <br />
    //       </Col>
    //     </Row>
    //   </Container>
    // )

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

  // Retrieve an array of server URLs from the GitHub Gist.
  async getServers () {
    const gistLib = new GistServers()
    const gistServers = await gistLib.getServerList()

    const serversAry = []

    for (let i = 0; i < gistServers.length; i++) {
      serversAry.push({ value: gistServers[i].url, label: gistServers[i].url })
    }

    return serversAry
  }
}

export default ServerSelect
