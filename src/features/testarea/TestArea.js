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

import "./TestArea.scss";

import Time from "./Time";
import TestForm from './TestForm'
import ImageUploader from '../../app/common/form/ImageUploader'


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
        <TestForm />
      </div>
    );
  }
}

const mapState = state => {
  return {}
};

const actions = {};

export default connect(
  mapState,
  actions
)(TestArea);
