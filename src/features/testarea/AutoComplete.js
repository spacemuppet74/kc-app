import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Header, Search, Label } from 'semantic-ui-react'

import { gpItemsTree } from '../gpitems/gpItemsReducer'

const categoryRenderer = ({ name }) => <Header as="h4" content={name} />

const resultRenderer = ({ itemTitle }) => <Label content={itemTitle} />


class AutoComplete extends Component {
  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      items: { ...props.items }
    }
  }
  state = {
    value: '',
    items: this.props.items
  }
  handleResultSelect = (e, { result }) => {
    console.log('selected result ', result)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ value })

    if (this.state.value.length > 3) {
      const categories = Object.keys(this.props.items)
      const filtered = categories.filter(category => {
        const filteredResults = this.props.items[category].results.filter(product => {
          return product.title.includes(this.state.value)
        })

        if (filteredResults.length > 0) {

        }
      })
    }
  }
  render() {
    const { loading } = this.props
    const { items } = this.state
    return (
      <div>
        <Header as="h1" content="AutoComplete" />
        <Search
          category
          loading={loading}
          results={items}
          categoryRenderer={categoryRenderer}
          resultRenderer={resultRenderer}
        />
      </div>)
  }
}

const mapState = state => {
  return {
    loading: state.gpItems.loading,
    items: gpItemsTree(state)
  }
}

export default connect(mapState)(AutoComplete);