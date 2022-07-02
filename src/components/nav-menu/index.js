/*
  This component controlls the navigation menu.

  Inspired from this example:
  https://codesandbox.io/s/react-bootstrap-hamburger-menu-example-rnud4?from-embed
*/

// Global npm libraries
import React from 'react'
import { Nav, Navbar, NavDropdown, Image } from "react-bootstrap"
import Logo from './psf-logo.png'
// import { ReactComponent as Logo } from "./psf-logo.png"

class NavMenu extends React.Component {
  constructor(props) {
    super(props)
    console.log('NavMenu')
  }

  render() {
    return(
      <>
        <Navbar collapseOnSelect expand="xxxl" bg="dark" variant="dark" style={{paddingRight: '20px'}} >
          <Navbar.Brand href="#home" style={{paddingLeft: '20px'}}>
            <Image src={Logo} thumbnail width="50" />{' '}
            PSF Web3 Demo
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Placeholder 1</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Placeholder 2</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Placeholder 3
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}

export default NavMenu
