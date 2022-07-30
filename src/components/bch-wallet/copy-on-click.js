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

let _this

class CopyOnClick extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      walletProp: props.walletProp,
      bchWalletState: props.appData.bchWalletState
    }

    _this = this
  }

  render () {
    return (
      <>
        <FontAwesomeIcon icon={faCopy} size='lg' onClick={() => _this.copyToClipboard(_this.state.walletProp)} />
      </>
    )
  }

  async copyToClipboard (key) {
    const val = _this.state.bchWalletState[key]
    console.log(`value copied to clipboard: ${val}`)

    try {
      // Capacitor Android environment.

      // Write the value to the clipboard.
      await Clipboard.write({
        string: val
      })

      // Check that the value was written successfully
      // const { value } = await Clipboard.read()
      // console.log(`Clipboard value: ${value}`)
    } catch (err) {
      // Browser environment. Use normal browser methods.

      const textArea = document.createElement('textarea')
      textArea.value = val
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('Copy')
      textArea.remove()
    }
  }
}

export default CopyOnClick
