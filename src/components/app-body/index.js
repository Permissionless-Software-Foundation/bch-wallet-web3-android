/*
  This Body component is a container for all the different Views of the app.
  Views are equivalent to 'pages' in a multi-page app. Views are hidden or
  displayed to simulate the use of pages in an SPA.
  The Body app contains all the Views and chooses which to show, based on
  the state of the Menu component.
*/

// Global npm libraries
import React from 'react'

class AppBody extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeView: 0,
      menuState: props.menuState
    }
  }

  render() {
    return(
      <></>
    )
  }
}

export default AppBody
