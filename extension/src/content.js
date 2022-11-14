const extension = require('webextension-polyfill');

// Insert flag into window object to denote CashTab is available and active as a browser extension
// Could use a div or other approach for now, but emulate MetaMask this way so it is extensible to other items
// Try window object approach
var bchWalletInject = document.createElement('script');
bchWalletInject.innerHTML = `window.bitcoinCash = 'psfWallet'`;
document.head.appendChild(bchWalletInject);

// Process page messages
// Chrome extensions communicate with web pages through the DOM
// Page sends a message to itself, chrome extension intercepts it
const port = extension.runtime.connect({ name: 'bchPort' });
// console.log(`port: ${JSON.stringify(port)}`);
// console.log(port);

window.addEventListener(
  'message',
  function (event) {
    // console.log('event: ', event);
    // We only accept messages from ourselves
    if (event.origin !== 'wallet' || !event.data.type) return;

    // console.log('wallet event: ', event.data);
    port.postMessage(event.data);
  },
  false
);
