/*
  This component contains a drop-down form that lets the user select from
  a range of Global Back End servers.
*/

// Global npm libraries
import React from 'react'
// import Select from 'react-dropdown-select'
import { Container, Row, Col, Form } from 'react-bootstrap'

// Local libraries
import GistServers from '../../services/gist-servers'

const defaultOptions = [
  { value: 'https://free-bch.fullstack.cash', label: 'https://free-bch.fullstack.cash' },
  { value: 'https://bc01-ca-bch-consumer.fullstackcash.nl', label: 'https://bc01-ca-bch-consumer.fullstackcash.nl' },
  { value: 'https://pdx01-usa-bch-consumer.fullstackcash.nl', label: 'https://pdx01-usa-bch-consumer.fullstackcash.nl' },
  { value: 'https://wa-usa-bch-consumer.fullstackcash.nl', label: 'https://wa-usa-bch-consumer.fullstackcash.nl' }
]

// const defaultOptions = [
//   'https://free-bch.fullstack.cash',
//   'https://bc01-ca-bch-consumer.fullstackcash.nl',
//   'https://pdx01-usa-bch-consumer.fullstackcash.nl',
//   'https://wa-usa-bch-consumer.fullstackcash.nl'
// ]

class ServerSelect extends React.Component {
  constructor (props) {
    super(props)

    // this.wallet = props.wallet

    this.state = {
      options: defaultOptions
    }
  }

  // async componentDidMount () {
  //   const servers = await this.getServers()
  //   // console.log('Server list retrieved from GitHub Gist: ', servers)
  //
  //   this.setState({
  //     options: servers
  //   })
  // }

  // This is called when the a new drop-down item is selected.
  selectServer (event) {
    console.log('event.target.value: ', event.target.value)

    const value = event.target.value

    if (!value) return

    window.location.href = `/?restURL=${value}`
  }

  // render() {
  //   return (
  //     <div>
  //       <Select options={this.state.options} onChange={(values) => this.selectServer(values)} />
  //       <p style={{textAlign: 'center'}}>Having trouble loading the NFTs? If NFTs don't load after a minute, then
  //       try selecting a different back-end server.</p>
  //     </div>
  //   )
  // }

  render () {
    const items = []
    for (let i = 0; i < this.state.options.length; i++) {
      const thisServer = this.state.options[i]

      items.push(<option key={`server-${i}`} value={thisServer.value}>{thisServer.label}</option>)
    }

    return (
      <Container>
        <hr />
        <Row>
          <Col>
            <br />
            <h5 style={{ textAlign: 'center' }}>
              Having trouble loading the NFTs? If NFTs don't load after a minute,
              then try selecting a different back-end server.
            </h5>
            <Form.Select onChange={(values) => this.selectServer(values)}>
              <option>Choose a back-end server</option>
              {items}
            </Form.Select>
            <br />
          </Col>
        </Row>
      </Container>
    )
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
