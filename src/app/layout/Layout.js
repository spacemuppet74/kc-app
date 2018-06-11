import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Sidebar, Segment, Menu, Icon,  Dimmer, Loader } from "semantic-ui-react";

import { selectorHubSitesLoading,selectorSelectedHubSite } from "../../features/hubsites/hubSitesReducer";
import {selectorGPItemsLoading} from '../../features/gpitems/gpItemsReducer'
import { updateSelectedSite } from '../../features/hubsites/hubSitesActions'
import {fetchCardsRequest} from '../../features/cards/cardsActions'


class Layout extends Component {
  componentDidMount() {
    const {loadingHubSites, loadingGPItems, selectedSite, match: {params} } = this.props
    if(!loadingHubSites && !loadingGPItems && !selectedSite ) {
      this.props.updateSelectedSite(params.site)
    }

    if(selectedSite) {
      console.log('we have a selected site ', selectedSite)
      fetchCardsRequest(selectedSite.Id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {loadingHubSites, loadingGPItems, updateSelectedSite,selectedSite,fetchCardsRequest} = this.props
 
    // when we are finished loading the data from sp
    // so loadingHubSites & loadingGPItem need to be false
    // and can't equal the prevProps 
    if((!loadingHubSites && !loadingGPItems && (loadingHubSites !== prevProps.loadingHubSites || loadingGPItems !== prevProps.loadingGPItems)) ) {
      const {params} = this.props.match
      updateSelectedSite(params.site)
    }

    if(selectedSite) {
      console.log('we have a selected site ', selectedSite)
      fetchCardsRequest(selectedSite.Id)
    }
  }
  
  render() {
    const { children, loadingHubSites, loadingGPItems, selectedSite } = this.props;
    if(loadingHubSites || loadingGPItems) {
      return (
        <Segment style={{minHeight: '100%'}}>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
      )
    }

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
        <Menu.Item name="home" as={Link} to={`/${selectedSite.Title}`}>
            <Icon name="home" />
            {selectedSite.Title}
          </Menu.Item>
          
          <Menu.Item name="gamepad" as={Link} to="/test">
            <Icon name="gamepad" />
            Test
          </Menu.Item>
          <Menu.Item name="camera">
            <Icon name="camera" />
            Channels
          </Menu.Item>
          <Menu.Item name="camera" as={Link} to={`/${selectedSite.Title}/card`}>
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

const mapState = (state,props) => {
  return {
    loadingHubSites: selectorHubSitesLoading(state),
    loadingGPItems: selectorGPItemsLoading(state),
    selectedSite: selectorSelectedHubSite(state)
  };
};

const actions = {
updateSelectedSite,
fetchCardsRequest
};

export default withRouter(connect(mapState, actions)(Layout));
