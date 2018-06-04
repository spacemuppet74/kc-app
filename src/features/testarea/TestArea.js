import React, { Component } from "react";
import { connect } from "react-redux";
import matchSorter, { rankings, caseRankings } from "match-sorter";
import { Header, Search, Label, Icon } from "semantic-ui-react";

import {
  getGPItemsSelector,
  gpListing,
  gpItems
} from "../gpitems/gpItemsReducer";

import "./TestArea.scss";

const category = (listing, gpItems) => {
  const res = listing.reduce((prev, next) => {
    const item = gpItems[next];
    let uofm = item.UOFM.trim().toLowerCase();

    if (prev[uofm]) {
      prev[uofm].results = [
        ...prev[uofm].results,
        {
          title: item.ItemCode.trim(),
          description: item.UOMDescription.trim(),
          gpcode: item.ID.trim()
        }
      ];
    } else {
      prev[uofm] = {
        name: uofm,
        results: [
          {
            title: item.ItemCode.trim(),
            description: item.UOMDescription.trim(),
            gpcode: item.ID.trim()
          }
        ]
      };
    }

    return { ...prev };
  }, {});
  return res;
};

class TestArea extends Component {
  state = {
    items: category(this.props.listing, this.props.items),
    selectedValue: "",
    term: ""
  };

  handleResultSelect = (e, { result }) => {
    console.log("you selected ", result);
  };

  handleSearchChange = (e, { value }) => {
    console.log(value);
    this.setState({ term: value });
    const filtered = matchSorter(Object.values(this.props.items), value, {
      keys: [item => item.ItemCode]
    }).map(product => product.ID);

    console.log(category(filtered, this.props.items));
    const result = category(filtered, this.props.items);
    console.log("result ", result);
    this.setState({ items: result, test: result });
    console.log(this.state.items);
  };

  customCategoryRender = ({ name }) => {
    return (
      <Label>
        <Icon name="box" />
        <Header as="h3" content={name} />
      </Label>
    );
  };

  render() {
    const { selectedValue, items, term } = this.state;
    return (
      <div>
        <Header as="h1" content="Test Area" />
        <Search
          category
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          value={term}
          results={items}
          categoryRenderer={this.customCategoryRender}
        />
      </div>
    );
  }
}

const mapState = state => {
  return {
    items: gpItems(state),
    listing: gpListing(state)
  };
};

const actions = {};

export default connect(mapState, actions)(TestArea);
