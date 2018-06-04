import React from 'react';
import ReactDOM from 'react-dom'

import './index.css'
import 'semantic-ui-css/semantic.min.css';

const el = document.getElementById('root')

import App from './App'

const render = () => {
  ReactDOM.render(<App />, el)
}

render()