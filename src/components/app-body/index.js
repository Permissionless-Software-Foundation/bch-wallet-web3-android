/*
  This Body component is a container for all the different Views of the app.
  Views are equivalent to 'pages' in a multi-page app. Views are hidden or
  displayed to simulate the use of pages in an SPA.
  The Body app contains all the Views and chooses which to show, based on
  the state of the Menu component.
*/

// Global npm libraries
import React from 'react'

// Local libraries
import BchWallet from '../bch-wallet'
import BchSend from '../bch-send'
import SlpTokens from '../slp-tokens'
import ServerSelectView from '../servers/select-server-view'
import Sweep from '../sweep'
import Sign from '../sign'

function AppBody (props) {
  // Dependency injection through props
  const appData = props.appData
  const menuState = props.menuState
  // console.log('AppBody() menuState: ', menuState)

  function chooseView (menuState) {
    // console.log(`chooseView() menuState: ${menuState}`)

    switch (menuState) {
      case 0:
        return (<BchSend appData={appData} />)
      case 1:
        return (<SlpTokens appData={appData} />)
      case 2:
        return (<BchWallet appData={appData} />)
      case 3:
        return (<Sweep appData={appData} />)
      case 4:
        return (<Sign appData={appData} />)

        // Special Views
      case 100:
        return (<ServerSelectView appData={appData} />)
      default:
        return (<BchSend appData={appData} />)
    }
  }

  return (
    <>
      {chooseView(menuState)}
    </>
  )
}

export default AppBody
