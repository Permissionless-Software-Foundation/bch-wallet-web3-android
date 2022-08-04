/*
  This component controlls the navigation menu.

  Inspired from this example:
  https://codesandbox.io/s/react-bootstrap-hamburger-menu-example-rnud4?from-embed
*/

// Global npm libraries
import React from 'react'
import { Nav, Navbar, Image } from 'react-bootstrap'
import Logo from './psf-logo.png'

class NavMenu extends React.Component {
  constructor (props) {
    super(props)

    // This is the event handler passed in from the Parent component.
    this.parentMenuHandler = props.menuHandler
  }

  render () {
    // console.log(`selectedMenuItem: ${this.state.selectedMenuItem}`)
    // this.handleMenuClick(this.state.selectedMenuItem)

    return (
      <>
        <Navbar collapseOnSelect expand='xxxl' bg='dark' variant='dark' style={{ paddingRight: '20px' }}>
          <Navbar.Brand href='#home' style={{ paddingLeft: '20px' }}>
            <Image src={Logo} thumbnail width='50' />{' '}
            BCH Web3 Wallet
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto' style={{ padding: '25px' }}>
              <Nav.Link href='#' onClick={() => this.handleClickEvent(0)}>BCH</Nav.Link>
              <Nav.Link href='#' onClick={() => this.handleClickEvent(1)}>Tokens</Nav.Link>
              <Nav.Link href='#' onClick={() => this.handleClickEvent(2)}>Wallet</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }

  handleClickEvent (menuItem) {
    // Pass the selected menu item up to the parent component.
    this.parentMenuHandler(menuItem)
  }
}

export default NavMenu
