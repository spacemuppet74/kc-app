import React, { Component } from 'react'
import {connect} from 'react-redux'

import {cardDetails} from '../cardsReducer'

class Card extends Component {
    render() {
        return (
            <div>
                Card
                { JSON.stringify(this.props.card.card, null ,2)}
                <br/>
                { JSON.stringify(this.props.card.gpItem, null ,2)}
                <br/>
                { JSON.stringify(this.props.card.gpSite, null ,2)}
                <br/>
                { JSON.stringify(this.props.card.site, null ,2)}
            </div>
        )
    }
}

const mapState = state => {
    return {
        card: cardDetails(state)
    }
}

const actions = {}

export default connect(mapState, actions)(Card)