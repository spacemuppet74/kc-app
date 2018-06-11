import React, { Component } from 'react'
import {connect} from 'react-redux'

import {Table} from 'semantic-ui-react'
import CardsListItem from './CardsListItem'


class CardsList extends Component {
  render() {
      const {list} = this.props
    return (
      <Table selectable celled>
          <Table.Header>
            <Table.Row>
                <Table.HeaderCell>GP Number</Table.HeaderCell>
                <Table.HeaderCell>Vendor Number</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
                {list.map(key => <CardsListItem key={key} cardID={key} />)}
            </Table.Body>
          </Table>
    )
  }
}

const mapState = state => {
    return {
        list: state.cards.listing
    }
}

export default connect(mapState)(CardsList)
