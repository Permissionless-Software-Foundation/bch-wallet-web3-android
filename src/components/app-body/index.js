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
import GetBalance from '../balance'
import Placeholder2 from '../placeholder2'
import Placeholder3 from '../placeholder3'
import ServerSelectView from '../servers/select-server-view'

function AppBody (props) {
  // Dependency injection through props
  const appData = props.appData
  const menuState = props.menuState
  // console.log('AppBody() menuState: ', menuState)

  function chooseView (menuState) {
    // console.log(`chooseView() menuState: ${menuState}`)

    switch (menuState) {
      case 0:
        return (<GetBalance wallet={appData.wallet} />)
      case 1:
        return (<Placeholder2 />)
      case 2:
        return (<Placeholder3 />)

        // Special Views
      case 100:
        return (<ServerSelectView appData={appData} />)
      default:
        return (<GetBalance wallet={appData.wallet} />)
    }
  }

  return (
    <>
      {chooseView(menuState)}
    </>
  )
}

export default AppBody
