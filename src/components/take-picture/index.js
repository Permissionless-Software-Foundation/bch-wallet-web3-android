/*
  This is a View component that allows the user to take a picture with their
  webcam or phone.
*/

// Global npm libraries
import React from 'react'

class TakePicture extends React.Component {
  constructor (props) {
    super(props)

    console.log('Take Picture component loaded')

    // this.state = {
    //   activeView: 0,
    //   menuState: props.menuState
    // }
  }

  render () {
    return (
      <>
        <p>Take Picture Component Placeholder</p>
      </>
    )
  }
}

export default TakePicture
