import React, { Component } from 'react'
import {Table, Checkbox} from 'semantic-ui-react'
import {connect} from 'react-redux'

import {selectCard} from '../cardsActions'


class CardsListItem extends Component {

    handleCardSelect = () => {
        console.log('you selected, ',this.props.cardID)
        this.props.selectCard(this.props.cardID)
    }

    render() {
        const {selectedCard, card, gpItem,gpLocation } = this.props
        if(!card) {
            return (
                <Table.Row>
                <Table.Cell colSpan={4}>no data...</Table.Cell>
            </Table.Row>
            )
        }
        return (
            <Table.Row>
                <Table.Cell>
                    <Checkbox onChange={this.handleCardSelect} checked={selectedCard == card.Id}/>
                </Table.Cell>
                <Table.Cell>{gpItem.ItemCode}</Table.Cell>
                <Table.Cell>{gpItem.ManufacutureID}</Table.Cell>
                <Table.Cell>{gpItem.ITEMDESC}</Table.Cell>
                <Table.Cell>{gpLocation.LOCNDSCR.trim()}</Table.Cell>
            </Table.Row>
        )
    }
}

const mapState = (state,ownProps) => {
    return {
        card: state.cards.byIds[ownProps.cardID],
        gpItem: state.gpItems.byIds[state.cards.byIds[ownProps.cardID].gp_item_id],
        gpLocation: state.gpSites.byIds[state.cards.byIds[ownProps.cardID].gp_location],
        selectedCard: state.cards.selectedCard
    }
}

const actions = {
    selectCard
}

export default connect(mapState, actions)(CardsListItem)
