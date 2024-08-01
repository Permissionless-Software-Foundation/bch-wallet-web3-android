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
  // console.log('Terminal() appData: ', appData)

  let wallet = appData.bchWallet
  const serverUrl = appData.serverUrl
  const mnemonic = appData.bchWallet.walletInfo.mnemonic

  // This function is passed to some commands (like wallet_index) to change the
  // wallet being used by the terminal.
  const switchWallet = async (inObj = {}) => {
    try {
      let { index } = inObj

      // By default, use the 0 HD index.
      if (!index) index = 0

      if (typeof window !== 'undefined' && window.SlpWallet) {
        const BchWallet = window.SlpWallet

        const hdPath = `m/44'/245'/0'/0/${index}`

        const options = {
          interface: 'consumer-api',
          restURL: serverUrl,
          hdPath
        }

        // Update the wallet object used by the terminal.
        wallet = new BchWallet(mnemonic, options)

        await wallet.initialize()

        return wallet
      } else {
        throw new Error('minimal-slp-wallet is not loaded in the window object.')
      }
    } catch (err) {
      console.error('Error in switchWallet(): ', err)
    }
  }

  // This object contains utility functions for manipulating the terminal
  // environment.
  const termUtils = {
    switchWallet
  }

  // Commands available to the terminal.
  const commands = {
    help: (
      <span>
        <strong>clear</strong> - clears the console. <br />
        <strong>wallet_index</strong> - Change the HD index of the wallet. <br />
        <strong>wallet_info</strong> - Display addresses, mnemonic, and private key for the wallet. <br />
        <strong>wallet_balance</strong> - Check the balance of the selected HD key pair. <br />
        <strong>psffpp_pin</strong> - Pin a CID with the PSFFPP IPFS cluster. <br />
        <strong>token_info</strong> - Get info about a SLP token. <br />
        <strong>token_mda</strong> - Setup a Mutable Data Address for a tokens mutable data. <br />
        <strong>token_update</strong> - Update the mutable data attached to a token.<br />
        <strong>token_create_fungible</strong> - Create a Type 1 Fungible token (or simple NFT).<br />
      </span>
    ),
    wallet_info: (args) => { return commandRouter.routeCommand({ cmdStr: 'wallet_info', wallet, termUtils, args }) },
    wallet_index: (args) => { return commandRouter.routeCommand({ cmdStr: 'wallet_index', wallet, termUtils, args }) },
    wallet_balance: (args) => { return commandRouter.routeCommand({ cmdStr: 'wallet_balance', wallet, termUtils, args }) },
    token_info: (args) => { return commandRouter.routeCommand({ cmdStr: 'token_info', wallet, termUtils, args }) },
    psffpp_pin: (args) => { return commandRouter.routeCommand({ cmdStr: 'psffpp_pin', wallet, termUtils, args }) },
    token_mda: (args) => { return commandRouter.routeCommand({ cmdStr: 'token_mda', wallet, termUtils, args }) },
    token_create_fungible: (args) => { return commandRouter.routeCommand({ cmdStr: 'token_create_fungible', wallet, termUtils, args }) },
    token_update: (args) => { return commandRouter.routeCommand({ cmdStr: 'token_update', wallet, termUtils, args }) }
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
            <h2>Terminal</h2>
            <p>
              The primary purpose of the terminal is to allow advanced users to
              tap into wallet features that do not have a Graphical User Interface
              (GUI). The secondary purpose is to provide developers with a tool
              for rapid prototyping of new ideas, by remove the need to develop
              a GUI before developing new features.
            </p>
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
