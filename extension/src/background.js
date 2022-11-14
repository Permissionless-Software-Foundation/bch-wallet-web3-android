const extension = require('webextension-polyfill');

const NOTIFICATION_HEIGHT = 660;
const NOTIFICATION_WIDTH = 380;

// This starts listening to the port created with `extension.runtime.connect` in content.js
function connected(port) {
  console.assert(port.name === 'bchPort');
  port.onMessage.addListener(function (msg) {
    if (msg.text === 'psfWallet' && msg.type) {
      triggerUi(msg);
    }
  });
}

extension.runtime.onConnect.addListener(connected);

async function triggerUi(msg) {
  // TODO: display Send page with query params here
  extension.windows.create({
    url: 'popup.html',
    type: 'popup',
    width: NOTIFICATION_WIDTH,
    height: NOTIFICATION_HEIGHT,
  });
}
