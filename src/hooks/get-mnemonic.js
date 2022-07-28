/*
  This hook retrieves the wallet mnemonic from LocalStorage.
*/

import useLocalStorageState from 'use-local-storage-state'

function GetMnemonic () {
  const [mnemonic, setMnemonic] = useLocalStorageState('bchMnemonic', {
    ssr: true,
    defaultValue: undefined
  })

  return { mnemonic, setMnemonic }
}

export default GetMnemonic
