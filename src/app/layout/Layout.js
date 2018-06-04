import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Sidebar, Segment, Menu, Icon, Header } from "semantic-ui-react";

import { updateSelectedSite } from "../../features/hubsites/hubSitesActions";

class Layout extends Component {
  componentDidMount() {
    console.log(this.props.match);
    this.props.updateSelectedSite(this.props.match.params.site);
  }
  render() {
    const { children, site } = this.props;
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="slide along"
          width="thin"
          visible={true}
          icon="labeled"
          vertical
        >
          <Menu.Item name="home" as={Link} to={`/${site}`}>
            <Icon name="home" />
            {site}
          </Menu.Item>
          <Menu.Item name="gamepad" as={Link} to="/test">
            <Icon name="gamepad" />
            Test
          </Menu.Item>
          <Menu.Item name="camera">
            <Icon name="camera" />
            Channels
          </Menu.Item>
          <Menu.Item name="camera" as={Link} to={`/${site}/card`}>
            <Icon name="add" />
            New Card
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic>{children}</Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

const mapState = state => {
  return {
    site: state.hubSites.selectedSite
  };
};

const actions = {
  updateSelectedSite
};

export default withRouter(connect(mapState, actions)(Layout));
