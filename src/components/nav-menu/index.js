/*
  This component controlls the navigation menu.

  Inspired from this example:
  https://codesandbox.io/s/react-bootstrap-hamburger-menu-example-rnud4?from-embed
*/

// Global npm libraries
import React from 'react'
import { Nav, Navbar, Image } from 'react-bootstrap'
import Logo from './psf-logo.png'

function NavMenu (props) {
  const handleClickEvent = (menuItem) => {
    // Pass the selected menu item up to the parent component.
    props.menuHandler(menuItem, props.appData)
  }

  return (
    <>
      <Navbar collapseOnSelect expand='xxxl' bg='dark' variant='dark' style={{ paddingRight: '20px' }}>
        <Navbar.Brand href='#home' style={{ paddingLeft: '20px' }}>
          <Image src={Logo} thumbnail width='50' />{' '}
          PSF Web3 Demo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#' onClick={(e) => handleClickEvent(0)}>Check Balance</Nav.Link>
            <Nav.Link href='#' onClick={(e) => handleClickEvent(1)}>Placeholder2</Nav.Link>
            <Nav.Link href='#' onClick={(e) => handleClickEvent(2)}>Placeholder 3</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavMenu
