import React, { Component } from "react";
import { connect } from "react-redux";
import matchSorter, { rankings, caseRankings } from "match-sorter";

import { Header, Search, Label, Icon, Input, Form } from "semantic-ui-react";

import AutoComplete from './AutoComplete'

import {
  getGPItemsSelector,
  gpListing,
  gpItems
} from "../gpitems/gpItemsReducer";

import "./TestArea.scss";


class TestArea extends Component {
  constructor(props) {
    super(props)
    console.log('contstructor ', props)
    this.state = {
      items: props.items
    }
  }

  render() {
    const { selectedValue, items, term, isOpen } = this.state;
    return (
      <div>
        <Header as="h1" content="Test Area" />
        <Form.Field>
          <label htmlFor="">Search for GP Number:</label>
          <AutoComplete />
        </Form.Field>
      </div>
    );
  }
}

const mapState = state => {
  return {
  };
};

const actions = {};

export default connect(mapState, actions)(TestArea);
