import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../../features/home/Home";
import Layout from "./Layout";
import TestArea from "../../features/testarea/TestArea";
import CardsDashboard from "../../features/cards/CardsDashboard/CardsDashboard";
import CardForm from "../../features/cards/CardForm/CardForm";

class App extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path="/test"
            render={() => (
              <Layout>
                <TestArea />
              </Layout>
            )}
          />
          <Route
            path="/:site/card"
            render={() => (
              <Layout>
                <CardForm />
              </Layout>
            )}
          />
          <Route
            path="/:site"
            render={() => (
              <Layout>
                <CardsDashboard />
              </Layout>
            )}
          />
          <Route exact path="*" component={Home} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
