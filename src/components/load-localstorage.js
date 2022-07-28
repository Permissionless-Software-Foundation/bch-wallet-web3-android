/*
  Load data from LocalStorage
  This is a round-about way of loading the 'use-local-storage-state'
*/

import GetMnemonic from '../hooks/get-mnemonic'

function LoadLocalStorage (props) {
  // This function is used to pass the mnemonic up to the parent component.
  const passMnemonic = props.passMnemonic

  const { mnemonic, setMnemonic } = GetMnemonic()

  // Pass the result up to the parent component.
  passMnemonic(mnemonic, setMnemonic)

  return true
}

export default LoadLocalStorage
