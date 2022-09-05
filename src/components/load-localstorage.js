/*
  Load data from LocalStorage
  This is a round-about way of loading the 'use-local-storage-state'
*/

// Global npm libraries
import useLocalStorageState from 'use-local-storage-state'

function LoadLocalStorage (props) {
  const [lsState, setLSState, { removeItem }] = useLocalStorageState('bchWalletState', {
    ssr: true,
    defaultValue: {}
  })

  // This function is used to pass the mnemonic up to the parent component.
  const passMnemonic = props.passMnemonic

  // Pass the result up to the parent component.
  passMnemonic(lsState, setLSState, removeItem)

  return true
}

export default LoadLocalStorage
