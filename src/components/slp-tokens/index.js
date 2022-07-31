/*
  This View displays the SLP tokens in the wallet.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

// Local libraries
// import SendCard from './send-card'
// import BalanceCard from './balance-card'
// import ReceiveCard from './receive-card'

class SlpTokens extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData
    }
  }

  render () {
    return (
      <>
        <Container>
          <Row>
            <Col xs={6}>
              <Button variant='success'><FontAwesomeIcon icon={faRedo} size='lg' /> Refresh</Button>
            </Col>
            <Col xs={6} />
          </Row>
          <br />

        </Container>
      </>
    )
  }
}

export default SlpTokens
