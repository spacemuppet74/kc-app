import React, { Component } from "react";

import "./Home.scss";
import HomePageLinkList from "./HomePageLinks/HomePageLinksList";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="Home-Page">
        <div className="Home-Page-App">
          <h1>Kanban Cards</h1>
          <HomePageLinkList />
        </div>
      </div>
    );
  }
}

export default Home;
