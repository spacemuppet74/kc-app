import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Header,
  Search,
  Label,
  Icon,
  Input,
  Form,
  List
} from "semantic-ui-react";
import { gpItemsTree } from "../gpitems/gpItemsReducer";
import "./TestArea.scss";

import Time from "./Time";

import _ from 'lodash'

class TestArea extends Component {

  state = {
  };


  render() {
    const { term, items } = this.state;
    return (
      <div>
        <Header as="h1" content="Test Area" />
        <Time
          render={({ time }) => <h1>Time is {time.toLocaleString()} </h1>}
        />
      </div>
    );
  }
}

const mapState = state => {
  return {
    loadingGP: state.gpItems.loading,
    items: gpItemsTree(state)
  };
};

const actions = {};

export default connect(
  mapState,
  actions
)(TestArea);
