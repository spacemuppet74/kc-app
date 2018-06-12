import React, { Component } from "react";
import {Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'

import CardsList from '../CardsList/CardsList'
import Card from '../Card/Card'

class CardsDashboard extends Component {
  state = {};
  render() {
    return (
      <Grid divided>
        <Grid.Column width={8}>
          <CardsList />
        </Grid.Column>
        <Grid.Column width={8}>
         {this.props.card && <Card />}
        </Grid.Column>
        </Grid>
    )
  }
}

const mapState = state => {
  return {
    card: state.cards.selectedCard
  }
}

export default connect(mapState)(CardsDashboard);
