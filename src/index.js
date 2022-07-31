import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { QueryParamProvider } from 'use-query-params'
// import { createRoot } from 'react-dom/client'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <>
    <QueryParamProvider>
      <App />
    </QueryParamProvider>
  </>
  , document.getElementById('root'))

// Updating to React v18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
// const container = document.getElementById('root')
// const root = createRoot(container)
// root.render(
//   <>
//     <QueryParamProvider>
//       <App />
//     </QueryParamProvider>
//   </>
// )
