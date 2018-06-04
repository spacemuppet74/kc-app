import React, { Component, Fragment } from "react";
import { Grid, Form } from "semantic-ui-react";

class Card extends Component {
  state = {};
  render() {
    return (
      <Form>
        <Grid>
          <Grid.Column width={8}>
            <Form.Field width={8}>
              <label>GP Number</label>
              <input type="text" />
            </Form.Field>
          </Grid.Column>
          <Grid.Column />
        </Grid>
      </Form>
    );
  }
}

export default Card;
