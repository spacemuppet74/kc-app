import React from 'react';
import { Card, List } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { createSelector } from 'reselect'

const GPItemDetails = ({ gpItemDetails }) => {
  const { EquivalendUOFM, EquivalentQTY, ID, ITEMDESC, ItemCode, ManufacutureID, StorageCondition, UOFM, UOMDescription, UOMScheduleID } = gpItemDetails
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>GP Details</Card.Header>
      </Card.Content>
      <Card.Content>
        <List>
          <List.Item>
            <List.Content>
              <List.Header>Storage Temparture</List.Header>
              {StorageCondition.trim()}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Item Code</List.Header>
              {ItemCode.trim()}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Item Description</List.Header>
              {ITEMDESC.trim()}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Unit of Measure</List.Header>
              {UOMScheduleID.trim()}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Unit of Measure Decription</List.Header>
              {UOMDescription.trim()}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Ordering Unit of Measure</List.Header>
              {UOFM.trim()}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Count Inventory as Unit</List.Header>
              {EquivalendUOFM.trim()}
            </List.Content>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  )
}

// Selectors
const selector = formValueSelector('card')
const selectedGPItem = state => selector(state, 'gpItem')
const gpItems = state => state.gpItems.byIds
const selectGPItemDetails = createSelector(
  selectedGPItem,
  gpItems,
  (selectedGP, gpItems) => {
    return gpItems[selectedGP.itemcode]
  }
)

const mapState = state => {
  return {
    selectedGPItem: selectedGPItem(state),
    gpItemDetails: selectGPItemDetails(state)
  }
}

export default connect(mapState)(GPItemDetails);