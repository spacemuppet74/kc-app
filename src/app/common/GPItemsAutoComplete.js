import React, { Component } from 'react';
import { Search } from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { gpItemsTree } from '../../features/gpitems/gpItemsReducer'

class GPItemAutoComplete extends Component {

  static getDerivedStateFromProps(props, state) {
    console.log(props.items === state.items)
    if (!props.loading && Object.keys(props.items).length > 0 && !state.loaded) {
      return {
        items: { ...props.items },
        loaded: true,
      }
    }
    return null
  }

  filterData = (value) => {
    // clone the data from the store.. 
    // because it's object and array it stored by reference 
    // so need to clone so that we don't mutable the gold copy
    console.log('got and filter data ')
    const data = _.cloneDeep(this.props.items)
    const values = Object.values(data)
    const filtered = values.map(category => {
      const results = category.results.filter(product => {
        return product.title.toLowerCase().includes(value.toLowerCase())
      })
      category.results = [...results]
      return category
    }).filter(category => category.results.length > 0).reduce((prev, next) => {
      return { ...prev, [next.name]: next }
    }, {})

    console.log('filtered ', filtered)
    this.setState(() => ({ items: filtered, isLoading: false }))
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ term: value, isLoading: true })
    this.filterData(value)
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ term: result.title, selected: result })
  }


  state = {
    loaded: false,
    isLoading: false,
    term: '',
    selected: null
  }
  render() {
    const { isLoading, items, term } = this.state
    console.log('new state ', this.state)
    return (
      <Search
        category
        value={term}
        loading={isLoading}
        results={items}
        onSearchChange={_.debounce(this.handleSearchChange, 250, { leading: true })}
        onResultSelect={this.handleResultSelect}
        size='small'
      />
    )
  }
}

const mapState = state => {
  return {
    loading: state.gpItems.loading,
    items: gpItemsTree(state)
  }
}

export default connect(mapState)(GPItemAutoComplete);