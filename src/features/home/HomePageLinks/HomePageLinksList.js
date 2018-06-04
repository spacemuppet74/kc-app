import React from "react";
import { connect } from "react-redux";
import HomePageLinkItem from "./HomePageLinkItem";

import "./HomePageLinksList.scss";

const HomePageLinkList = ({ sites }) => {
  return (
    <div className="Home-Page-Links">
      {sites.map(site => <HomePageLinkItem siteID={site} key={site} />)}
    </div>
  );
};

const mapState = state => {
  return {
    sites: state.hubSites.listing
  };
};

export default connect(mapState)(HomePageLinkList);
