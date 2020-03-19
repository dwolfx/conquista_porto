/* eslint-disable no-extend-native */
/* eslint-disable func-names */
import React from 'react'

import ReactDOM from 'react-dom'
import App from './App'
import './setupTests'

import 'react-toastify/dist/ReactToastify.css'

Array.prototype.flatMap = Array.prototype.flatMap
  ? Array.prototype.flatMap
  : function(lambda) {
      return Array.prototype.concat.apply([], this.map(lambda))
    }

ReactDOM.render(<App />, document.getElementById('root'))
