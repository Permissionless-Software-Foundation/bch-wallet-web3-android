/*
  This component is visually represented with a copy icon. A wallet property
  is passed as a prop. When clicked, the wallet property is copied to the
  system clipboard.
*/

// Global npm libraries
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { Clipboard } from '@capacitor/clipboard'

// Contains app data passed from parent component.
let appData

// global reference to the state update handler.
let globalSetShowWord

function CopyOnClick (props) {
  const [showWord, setShowWord] = useState(false)

  // Pass data up to the global variables.
  appData = props.appData
  globalSetShowWord = setShowWord

  const copyIcon = (<FontAwesomeIcon icon={faCopy} size='lg' id={props.walletProp} onClick={handleCopyToClipboard} />)
  const copyWord = (<span style={{ color: 'green' }}>Copied!</span>)

  return (
    <>
      {
        showWord
          ? copyWord
          : copyIcon
      }
    </>
  )
}

async function handleCopyToClipboard (event) {
  console.log('event: ', event)
  // console.log('event.target.nearestViewportElement.attributes.id.nodeValue: ', event.target.nearestViewportElement.attributes.id.nodeValue)

  // console.log('_this.displayCopyMsg: ', _this.displayCopyMsg)

  // Get the name of the wallet property to be copied.
  const key = event.target.nearestViewportElement.attributes.id.nodeValue
  console.log('key: ', key)

  console.log('appData: ', appData)

  const val = appData.bchWalletState[key]
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

  // Display the copied message.
  // _this.setState({
  //   animationRunning: true
  // })
  // _this.displayCopyMsg = true
  // _this.render()
  // animationRunning = true
  globalSetShowWord(true)

  // Clear the copied message after some time.
  setTimeout(function () {
    // _this.setState({
    //   animationRunning: false
    // })
    // _this.displayCopyMsg = false
    // _this.render()
    // animationRunning = false
    globalSetShowWord(false)
  }, 1000)
}

// class CopyOnClick extends React.Component {
//   constructor (props) {
//     super(props)
//
//     this.displayCopyMsg = false
//
//     // Bind the state to this instance of the component.
//     this.addActiveClass = this.addActiveClass.bind(this)
//
//     this.state = {
//       walletProp: props.walletProp,
//       bchWalletState: props.appData.bchWalletState,
//       // displayCopyMsg: false
//       animationRunning: false
//     }
//
//     _this = this
//   }
//
//   render () {
//     const copyIcon = (<FontAwesomeIcon icon={faCopy} size='lg' id={this.state.walletProp} onClick={this.handleCopyToClipboard} />)
//     const copyWord = (<span style={{ color: 'green' }}>Copied!</span>)
//
//     return (
//       <>
//         {
//           this.state.animationRunning
//             ? copyWord
//             : copyIcon
//         }
//       </>
//     )
//   }
//
//   async handleCopyToClipboard (event) {
//     // console.log('event.target.nearestViewportElement.attributes.id.nodeValue: ', event.target.nearestViewportElement.attributes.id.nodeValue)
//
//     // console.log('_this.displayCopyMsg: ', _this.displayCopyMsg)
//
//     // Get the name of the wallet property to be copied.
//     const key = event.target.nearestViewportElement.attributes.id.nodeValue
//     console.log('key: ', key)
//
//     const val = _this.state.bchWalletState[key]
//     console.log(`value copied to clipboard: ${val}`)
//
//     try {
//       // Capacitor Android environment.
//
//       // Write the value to the clipboard.
//       await Clipboard.write({
//         string: val
//       })
//
//       // Check that the value was written successfully
//       // const { value } = await Clipboard.read()
//       // console.log(`Clipboard value: ${value}`)
//     } catch (err) {
//       // Browser environment. Use normal browser methods.
//
//       const textArea = document.createElement('textarea')
//       textArea.value = val
//       document.body.appendChild(textArea)
//       textArea.select()
//       document.execCommand('Copy')
//       textArea.remove()
//     }
//
//     // Display the copied message.
//     _this.setState({
//       animationRunning: true
//     })
//     // _this.displayCopyMsg = true
//     // _this.render()
//
//     // Clear the copied message after some time.
//     setTimeout(function () {
//       _this.setState({
//         animationRunning: false
//       })
//       // _this.displayCopyMsg = false
//       // _this.render()
//     }, 1000)
//   }
// }

export default CopyOnClick
