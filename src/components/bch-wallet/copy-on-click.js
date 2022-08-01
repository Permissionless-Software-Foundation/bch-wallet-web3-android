/*
  This component is visually represented with a copy icon. A wallet property
  is passed as a prop. When clicked, the wallet property is copied to the
  system clipboard.
*/

// Global npm libraries
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { Clipboard } from '@capacitor/clipboard'

class CopyOnClick extends React.Component {
  constructor (props) {
    super(props)

    this.displayCopyMsg = false

    // Bind the state to this instance of the component.
    // this.addActiveClass = this.addActiveClass.bind(this)

    this.state = {
      walletProp: props.walletProp,
      bchWalletState: props.appData.bchWalletState,
      // displayCopyMsg: false
      animationRunning: false,
      iconVis: 'visible',
      wordVis: 'hidden'
    }

    // _this = this
  }

  render () {
    return (
      <>
        <FontAwesomeIcon
          icon={faCopy} size='lg'
          id={`${this.state.walletProp}-icon`}
          onClick={(e) => this.handleCopyToClipboard(e, this)}
          style={{ visibility: `${this.state.iconVis}` }}
        />
        <span
          id={`${this.state.walletProp}-word`}
          style={{ color: 'green', visibility: `${this.state.wordVis}` }}
        >
          Copied!
        </span>
      </>
    )
  }

  async handleCopyToClipboard (event, _this) {
    // console.log('event.target.nearestViewportElement.attributes.id.nodeValue: ', event.target.nearestViewportElement.attributes.id.nodeValue)

    // console.log('_this.displayCopyMsg: ', _this.displayCopyMsg)

    // Get the name of the wallet property to be copied.
    let key = event.target.nearestViewportElement.attributes.id.nodeValue
    key = key.slice(0, -5)
    // console.log('key: ', key)

    const val = _this.state.bchWalletState[key]
    // console.log(`value copied to clipboard: ${val}`)

    try {
      // Capacitor Android environment.

      // Write the value to the clipboard.
      await Clipboard.write({
        string: val
      })
    } catch (err) {
      // Browser environment. Use normal browser methods.

      const textArea = document.createElement('textarea')
      textArea.value = val
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('Copy')
      textArea.remove()
    }

    // Display the 'Copied!' message.
    _this.setState({
      // animationRunning: true
      iconVis: 'hidden',
      wordVis: 'visible'
    })

    // Clear the copied message after some time.
    setTimeout(function () {
      _this.setState({
        // animationRunning: false
        iconVis: 'visible',
        wordVis: 'hidden'
      })
    }, 1000)
  }
}

export default CopyOnClick
