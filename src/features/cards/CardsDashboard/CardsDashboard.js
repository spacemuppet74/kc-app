import React, { Component } from "react";
import {Grid} from 'semantic-ui-react'


import CardsList from '../CardsList/CardsList'

class CardsDashboard extends Component {
  state = {};
  render() {
    return (
      <Grid divided>
        <Grid.Column width={8}>
          <CardsList />
        </Grid.Column>
        <Grid.Column width={8}>Selected Card</Grid.Column>
        </Grid>
    )
  }
}

export default CardsDashboard;
