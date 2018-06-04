import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./HomePageLinkItem.scss";

const HomePageLinkItem = ({ site }) => {
  return (
    <Link to={`/${site.Title}`}>
      <div className="Home-Page-Link">{site.Title}</div>
    </Link>
  );
};

const mapState = (state, ownProps) => {
  return {
    site: state.hubSites.byIds[ownProps.siteID]
  };
};

export default connect(mapState)(HomePageLinkItem);
