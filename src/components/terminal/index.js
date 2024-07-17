/*
  Parent Functional Component for the Console View.
  The other libraries in this directory support this component.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ReactTerminal } from 'react-terminal'

// Local libraries
import CommandRouter from './command-router.js'
const commandRouter = new CommandRouter()

function Terminal (props) {
  // Dependency injection through props
  const { appData } = props
  console.log('Terminal() appData: ', appData)

  const commands = {
    help: (
      <span>
        <strong>clear</strong> - clears the console. <br />
        <strong>wallet_info</strong> - Display addresses, mnemonic, and private key for the wallet. <br />
        <strong>wallet_import_mnemonic</strong> - Import a mnemonic and open it as the wallet. <br />
      </span>
    ),
    wallet_info: commandRouter.routeCommand({ cmdStr: 'wallet_info', appData })
  }

  const welcomeMessage = (
    <span>
      Type "help" for all available commands. <br />
    </span>
  )

  return (
    <>
      <Container>
        <Row>
          <Col>
            <p>
              Enter the command 'help' below to get a list of commands.
            </p>
            <ReactTerminal
              showControlBar={false}
              showControlButtons={false}
              welcomeMessage={welcomeMessage}
              commands={commands}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Terminal
