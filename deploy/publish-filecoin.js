/*
  This library is used to publish the compiled app to Filecoin.
  The publishToFilecoin() function will upload the 'build' folder to Filecoin
  via the web3.storage API.
  The function will return an object that contains the CID of the uploaded
  directory, and a URL for loading the app in a browser.

  In order to run this script, you must obtain an API key from web3.storage.
  That key should be saved to an environment variable named FILECOIN_TOKEN.
*/

const { Web3Storage, getFilesFromPath } = require('web3.storage')
const fs = require('fs')

async function publish () {
  try {
    const currentDir = `${__dirname}`
    // console.log(`Current directory: ${dir}`)
    const buildDir = `${currentDir}/../build`

    // Get the Filecoin token from the environment variable.
    const filecoinToken = process.env.FILECOIN_TOKEN
    if (!filecoinToken) {
      throw new Error(
        'Filecoin token not detected. Get a token from https://web3.storage and save it to the FILECOIN_TOKEN environment variable.'
      )
    }

    // Get a list of all the files to be uploaded.
    const fileAry = await getFileList(buildDir)
    // console.log(`fileAry: ${JSON.stringify(fileAry, null, 2)}`)

    // Upload the files to Filecoin.
    const cid = await uploadToFilecoin(fileAry, filecoinToken)

    // console.log('Content added to Filecoin with CID:', cid)
    // console.log(`https://${cid}.ipfs.dweb.link/`)

    return cid
  } catch (err) {
    console.error(err)
  }
}

function getFileList (buildDir) {
  const fileAry = []

  return new Promise((resolve, reject) => {
    fs.readdir(buildDir, (err, files) => {
      if (err) return reject(err)

      files.forEach(file => {
        // console.log(file)
        fileAry.push(`${buildDir}/${file}`)
      })

      return resolve(fileAry)
    })
  })
}

async function uploadToFilecoin (fileAry, token) {
  const storage = new Web3Storage({ token })

  const files = []
  for (let i = 0; i < fileAry.length; i++) {
    const thisPath = fileAry[i]
    // console.log('thisPath: ', thisPath)

    const pathFiles = await getFilesFromPath(thisPath)
    // console.log('pathFiles: ', pathFiles)

    files.push(...pathFiles)
  }

  console.log(`Uploading ${files.length} files. Please wait...`)
  const cid = await storage.put(files)

  return cid
}

module.exports = publish
