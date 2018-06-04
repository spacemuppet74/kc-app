import React, { Component } from 'react';
import { Header, Icon } from 'semantic-ui-react'

import './app.scss'

class App extends Component {
  state = {}
  render() {
    return (
      <div className="app">
        <Header as="h1" content="React App" />
        <Icon name="smile" />
      </div>)
  }
}

export default App