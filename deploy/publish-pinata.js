/*
  This library will pin the app to Pinata. It expects a CID
  as input, which is the output of publish-filecoin.js.

  Filecoin should be though of as cold-storage for data. It's very slow to
  retrieve. Pinata can be though of as RAM. It keeps content at the ready and
  fast to deliver. They are complimentary services.

  In order to run this script, you must obtain an API key from pinata.cloud.
  That key should be saved to an environment variable named PINATA_JWT.
*/

const axios = require('axios')

async function publishToPinata (cid) {
  // Get the Pinata token from the environment variable.
  const pinataToken = process.env.PINATA_JWT
  if (!pinataToken) {
    throw new Error(
      'Pinata JWT token not detected. Get a token from https://pinata.cloud and save it to the PINATA_JWT environment variable.'
    )
  }

  const now = new Date()

  const data = JSON.stringify({
    hashToPin: cid,
    pinataMetadata: {
      name: 'react-bootstrap-web3-spa',
      keyvalues: {
        timestamp: now.toISOString()
      }
    }
  })

  const config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinByHash',
    headers: {
      Authorization: `Bearer ${pinataToken}`,
      'Content-Type': 'application/json'
    },
    data
  }

  const res = await axios(config)

  console.log('\nCID pinned using Pinata:')
  console.log(res.data)
}

module.exports = publishToPinata
