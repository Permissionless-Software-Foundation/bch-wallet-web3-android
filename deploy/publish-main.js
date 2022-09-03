/*
  This is the main publish file that aggregates the other publish libraries
  and orchestrates them, so that one command can publish to different platforms.
*/

// Local libraries
const publishToFilecoin = require('./publish-filecoin')
const publishToPinata = require('./publish-pinata')

async function publish () {
  try {
    // Publish to Filecoin
    const cid = await publishToFilecoin()
    console.log('Content added to Filecoin with CID:', cid)
    console.log(`https://${cid}.ipfs.dweb.link/`)

    // Publish to Pinata
    await publishToPinata(cid)
  } catch (err) {
    console.error('Error while trying to publish app: ', err)
  }
}
publish()
