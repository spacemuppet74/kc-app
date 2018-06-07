import React, { Component, Fragment } from "react";
import { connect } from 'react-redux'
import _ from 'lodash'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { createSelector } from 'reselect'
import { Grid, Form, List, Card, Button } from "semantic-ui-react";

import GPItemAutoComplete from '../../../app/common/form/GPItemAutoComplete'
import TextInput from '../../../app/common/form/TextInput'
import SelectInput from '../../../app/common/form/SelectInput'
import ImageUploader from '../../../app/common/form/ImageUploader'

import GPItemDetails from '../../gpitems/GPItemDetails'

import { gpItemsTree } from '../../gpitems/gpItemsReducer'
import { selectGPSitesOptions } from '../../gpsites/gpSitesReducer'
import { selectHubSites } from '../../hubsites/hubSitesReducer'

class CardForm extends Component {

  static getDerivedStateFromProps(props, state) {
    console.log(props.items === state.items)
    if (!props.loading && state.items === null && !state.loaded) {
      return {
        items: { ...props.items },
        loaded: true,
        term: '',
        searchingGPItems: false
      }
    }
    return null
  }

  // for GP Items
  handleSearchChange = (value) => {
    console.log('gp items ', value)
    this.setState({ term: value, searchingGPItems: true })
    this.filterData(value)
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ term: result.title, selected: result })
  }

  filterData = ({ title }) => {
    // clone the data from the store.. 
    // because it's object and array it stored by reference 
    // so need to clone so that we don't mutable the gold copy
    console.log('got and filter data ')
    const data = _.cloneDeep(this.props.items)
    const values = Object.values(data)
    const filtered = values.map(category => {
      const results = category.results.filter(product => {
        return product.title.toLowerCase().includes(title.toLowerCase())
      })
      category.results = [...results]
      return category
    }).filter(category => category.results.length > 0).reduce((prev, next) => {
      return { ...prev, [next.name]: next }
    }, {})

    console.log('filtered ', filtered)
    this.setState(() => ({ items: filtered, searchingGPItems: false }))
  }

  handleSubmit = (values) => {
    console.log('form submitted ', values)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('component has updated ', this.props.selectedGPItem)
    if (this.props.selectedGPItem !== prevProps.selectedGPItem && this.props.selectedGPItem) {
      this.filterData(this.props.selectedGPItem)
    }
  }

  state = {
    items: null,
    loaded: false,
    term: ''
  };

  render() {
    const { searchingGPItems, items, term } = this.state
    const { gpSitesOptions } = this.props
    console.log('Form Store - GP Items ', this.props.gpItemValue)
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Grid>
          <Grid.Column width={5}>
            <Field
              name="gpItem"
              component={GPItemAutoComplete}
              type="text"
              label="Seach for GP Item"
              placeholder="Search for GP Item"
              searching={searchingGPItems}
              handleSearchChange={this.handleSearchChange}
              items={items}
              format={(value) => value ? value.title : ''}
            />
            <Field
              name="storeSite"
              component={SelectInput}
              type="text"
              label="Store Location"
              placeholder="Enter location"
              options={gpSitesOptions}
              search={true}
            />
            <Field
              name="locationOfItem"
              component={TextInput}
              type="text"
              label="Location of Item"
              placeholder="Enter location of Item"
            />
            <Field
              name="cardlocation"
              component={TextInput}
              type="text"
              label="Order Card Location"
              placeholder="Order Card Location"
            />
            <Field
              name="manufacturerCode"
              component={TextInput}
              type="text"
              label="Manufacturer Code"
              placeholder="Manufacturer Code"
            />
            <Field
              name="reorderpoint"
              component={TextInput}
              type="number"
              label="Reorder Point(minimum stock)"
              placeholder="Reorder Point"
            />
            <Field
              name="maxOnShelf"
              component={TextInput}
              type="number"
              label="Maxmimum On Shelf"
              placeholder="Maxmimum On Shelf"
            />
            <Field
              name="image"
              type="file"
              label="Upload Product Image"
              placeholder="upload image"
              component={ImageUploader}
              abel="Upload Image"
              width={6}
              bordered={true}
              size="medium"
            />

          </Grid.Column>
          <Grid.Column width={6}>
            {this.props.selectedGPItem && this.props.selectedGPItem.itemcode && <GPItemDetails />}
          </Grid.Column>
          <Grid.Row>
            <Grid.Column>
              <Button basic color="green">Submit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

// connect to form Store
const selector = formValueSelector('card')
const selectedGPItem = state => selector(state, 'gpItem')
const gpItems = state => state.gpItems.byIds

const gpItemValues = createSelector(
  gpItems,
  selectedGPItem,
  (gpItems, gpItem) => {
    console.log('get gp details ', gpItems)
    return gpItems[selectedGPItem.itemcode]
  }
)

const mapState = state => {
  return {
    loading: state.gpItems.loading,
    items: gpItemsTree(state),
    selectedGPItem: selectedGPItem(state),
    gpItemValue: gpItemValues(state),
    gpSitesOptions: selectGPSitesOptions(state)
  }
}

export default connect(mapState)(
  reduxForm({ form: 'card' })(CardForm)
)
