import React, { Component } from 'react'
import {Table} from 'semantic-ui-react'
import {connect} from 'react-redux'


class CardsListItem extends Component {

    render() {
        const { card, gpItem,gpLocation } = this.props
        if(!card) {
            return (
                <Table.Row>
                <Table.Cell colSpan={4}>no data...</Table.Cell>
            </Table.Row>
            )
        }
        return (
            <Table.Row>
                <Table.Cell>{gpItem.ItemCode}</Table.Cell>
                <Table.Cell>{gpItem.ManufacutureID}</Table.Cell>
                <Table.Cell>{gpItem.ITEMDESC}</Table.Cell>
                <Table.Cell>{gpLocation.LOCNDSCR}</Table.Cell>
            </Table.Row>
        )
    }
}

const mapState = (state,ownProps) => {
    return {
        card: state.cards.byIds[ownProps.cardID],
        gpItem: state.gpItems.byIds[state.cards.byIds[ownProps.cardID].gp_item_id],
        gpLocation: state.gpSites.byIds
    }
}

export default connect(mapState)(CardsListItem)
