import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { QueryParamProvider } from 'use-query-params'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <>
    <QueryParamProvider>
      <App />
    </QueryParamProvider>
  </>
  , document.getElementById('root'))
