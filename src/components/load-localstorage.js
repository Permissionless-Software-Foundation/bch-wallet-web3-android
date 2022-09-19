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

  // Pass an object and update the local storage.
  const updateLocalStorage = (lsObj) => {
    // console.log(`updateLocalStorage() input: ${JSON.stringify(lsObj, null, 2)}`)

    // Progressively overwrite the LocalStorage state.
    const newObj = Object.assign({}, lsState, lsObj)
    // console.log(`updateLocalStorage() output: ${JSON.stringify(newObj, null, 2)}`)

    setLSState(newObj)
  }

  // Pass the result up to the parent component.
  passMnemonic(lsState, updateLocalStorage, removeItem)

  return true
}

export default LoadLocalStorage
