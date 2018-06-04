import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../../features/home/Home";
import TestArea from "../../features/testarea/TestArea";

class App extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="(.+)"
            render={() => (
              <Switch>
                <Route path="/test" component={TestArea} />
              </Switch>
            )}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
