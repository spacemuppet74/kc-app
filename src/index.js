import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./app/store/configureStore";
import { fetchHubSites } from "./features/hubsites/hubSitesActions";
import { fetchGPSites } from "./features/gpsites/gpSitesActions";
import { fetchGPItems } from "./features/gpitems/gpItemsActions";
import { fetchStoresLocations } from './features/storelocations/storeLocationsActions'
import "semantic-ui-css/semantic.min.css";
import "./index.scss";

const store = configureStore();

// fetch hub sites
store.dispatch(fetchHubSites());
// fetch GP Sites
store.dispatch(fetchGPSites());
// fetch GP Items
store.dispatch(fetchGPItems());
// fetch Stores locations
store.dispatch(fetchStoresLocations())

const el = document.getElementById("root");

import App from "./app/layout/App";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    el
  );
};

render();
