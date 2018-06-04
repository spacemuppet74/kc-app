import React, { Component } from "react";
import { Header, HeaderContent } from "semantic-ui-react";

import "./TestArea.scss";

class TestArea extends Component {
  render() {
    return (
      <div>
        <Header as="h1" content="Test Area" />
      </div>
    );
  }
}

export default TestArea;
