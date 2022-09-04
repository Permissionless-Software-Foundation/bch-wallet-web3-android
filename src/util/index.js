/*
  A utility library for holding functions that are commonly used by many different
  areas of the app.
*/

class AppUtil {
  // Returns a promise that resolves 'ms' milliseconds.
  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default AppUtil
