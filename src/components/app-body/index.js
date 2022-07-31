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
// import Placeholder2 from '../placeholder2'
// import Placeholder3 from '../placeholder3'
import BchWallet from '../bch-wallet'
import BchSend from '../bch-send'

let _this

class AppBody extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeView: 0,
      menuState: props.menuState,
      appData: props.appData,
      bchWallet: props.appData.bchWallet,
      bchWalletState: props.appData.bchWalletState,
      delMnemonic: props.appData.delMnemonic,
      setMnemonic: props.appData.setMnemonic
    }

    // This function is passed from the parent component. It's used to update
    // the BCH wallet state.
    this.updateBchWalletState = props.appData.updateBchWalletState

    _this = this
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
        return (<GetBalance wallet={_this.state.bchWallet} />)
      case 1:
        return (<BchSend appData={_this.state.appData} />)
      case 2:
        return (
          <BchWallet
            appData={_this.state.appData}
          />
        )
      default:
        return (<GetBalance wallet={_this.state.bchWallet} />)
    }
  }
}

export default AppBody
