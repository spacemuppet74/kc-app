import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import matchSorter, { rankings, caseRankings } from "match-sorter";
import Downshift from "downshift";

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
import DebugJson from "../../app/common/DebugJson";

class TestArea extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      Object.keys(prevState.items).length === 0 &&
      Object.keys(nextProps.items).length > 0 &&
      prevState.term.length === 0
    ) {
      console.log("update state from props");
      return {
        items: Object.assign({}, nextProps.items)
      };
    }

    return null;
  }

  state = {
    isOpen: false,
    term: "",
    items: {}
  };

  filterItems = term => {
    console.log("filter data");
    const list = _.cloneDeep(this.props.items);
    const filtered = _.pickBy(list, (value, key) => {
      const filterResult = value.results.filter(product => {
        return product.ItemCode.toLowerCase().includes(term.toLowerCase());
      });
      value.results = [...filterResult];
      return value.results.length > 0 ? true : false;
    });

    this.setState({ items: { ...filtered } });
  };

  handleOnChange = value => {
    this.setState({ term: value });
    if (value.length > 3) {
      this.setState({ isOpen: true });
    } else {
      this.setState({ isOpen: false });
    }
    this.filterItems(value);
  };

  render() {
    const { term, items } = this.state;
    return (
      <div>
        <Header as="h1" content="Test Area" />
        <Time
          render={({ time }) => <h1>Time is {time.toLocaleString()} </h1>}
        />
        <Downshift
          filteredItems={items}
          itemToString={item => item.ItemCode}
          onChange={selection => alert(`You selected ${selection.value}`)}
          itemToString={item => (item ? item.value : "")}
          isOpen={this.state.isOpen} // whether to display the data
          inputValue={this.state.term} // input value
          onInputValueChange={this.handleOnChange} // update the input value on change
          onOuterClick={() => this.setState({ isOpen: true })} // stop the menu from close when click outside
        >
          {({ isOpen, getInputProps, inputValue, ...rest }) => {
            console.log("more props ", rest);
            return (
              <div>
                <Header as="h4" content="Search for GP Item" />
                <Input {...getInputProps()} placeholder="Search for GP Item" />
                {isOpen ? (
                  <List>
                    {Object.keys(this.props.items).map(category => {
                      return (
                        <List.Item key={category}>
                          <List.Icon name="folder" />
                          <List.Content>
                            <List.Header>{category}</List.Header>
                            <List.List>
                              {this.props.items[category].results.map(
                                product => (
                                  <List.List key={product.ItemCode}>
                                    <List.Content>
                                      <List.Header>
                                        {product.ItemCode}
                                      </List.Header>
                                      <List.Description>
                                        {product.UOMDescription}
                                      </List.Description>
                                    </List.Content>
                                  </List.List>
                                )
                              )}
                            </List.List>
                          </List.Content>
                        </List.Item>
                      );
                    })}
                  </List>
                ) : (
                  ""
                )}
              </div>
            );
          }}
        </Downshift>
      </div>
    );
  }
}

const mapState = state => {
  return {
    items: gpItemsTree(state)
  };
};

const actions = {};

export default connect(
  mapState,
  actions
)(TestArea);
