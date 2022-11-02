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

// let _this

class AppBody extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeView: 0,
      menuState: props.menuState,
      appData: props.appData
    }

    // This function is passed from the parent component. It's used to update
    // the BCH wallet state.
    this.updateBchWalletState = props.appData.updateBchWalletState

    // _this = this
  }

  render () {
    // console.log(`AppBody menu state: ${this.props.menuState}`)

    return (
      <>
        {this.chooseView(this.props.menuState)}
      </>
    )
  }

  chooseView (menuState) {
    // console.log(`chooseView() menuState: ${menuState}`)

    switch (menuState) {
      case 0:
        return (<BchSend appData={this.state.appData} />)
      case 1:
        return (<SlpTokens appData={this.state.appData} />)
      case 2:
        return (
          <BchWallet
            appData={this.state.appData}
          />
        )
      case 3:
        return (<Sweep appData={this.state.appData} />)
      case 4:
        return (<Sign appData={this.state.appData} />)

      // Special Views
      case 100:
        return (<ServerSelectView appData={this.state.appData} />)
      default:
        return (<BchSend appData={this.state.appData} />)
    }
  }
}

export default AppBody
