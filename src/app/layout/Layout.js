import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Sidebar, Segment, Menu, Icon,  Dimmer, Loader } from "semantic-ui-react";

import { selectorHubSitesLoaded,selectorSelectedHubSite } from "../../features/hubsites/hubSitesReducer";
import {selectorGPSitesLoaded} from '../../features/gpsites/gpSitesReducer'
import {selectedGPItemsLoaded} from '../../features/gpitems/gpItemsReducer'
import { updateSelectedSite } from '../../features/hubsites/hubSitesActions'
import {fetchCardsRequest} from '../../features/cards/cardsActions'


class Layout extends Component {
  componentDidMount() {
    const {loadedHubSites, loadedGPSites,loadedGPItems, selectedSite, match: {params} } = this.props
    // if we have load all the data and selected site title doesn't match the site param in the url
    // then update the selected site if we mounting the component
    if(loadedHubSites && loadedGPSites && loadedGPItems && selectedSite.Title !== params.site ) {
      this.props.updateSelectedSite(params.site)
    }

    // if the selected site has been set
    // and if the selected site doesn't match the url param site
    // we need to fetch new data for that site otherwise don't bother
    // as we already have it 
    if(selectedSite && selectedSite.Title !== params.site) {
      console.log('fetch new data ', selectedSite, params.site)
      fetchCardsRequest(selectedSite.Id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {loadedHubSites, loadedGPSites, loadedGPItems, updateSelectedSite,selectedSite,fetchCardsRequest, match: { params}} = this.props
 
    // when we are finished loading the data from sp
    // so loadingHubSites & loadingGPItem need to be false
    // and can't equal the prevProps 
    if(loadedGPItems && loadedGPSites && loadedHubSites && selectedSite.Title !== params.site ) {
      updateSelectedSite(params.site)
    }

    if(prevProps.selectedSite.Id !== selectedSite.Id) {
      console.log('we have a selected site ', selectedSite)
      fetchCardsRequest(selectedSite.Id)
    }
  }
  
  render() {
    const { children,loadedHubSites, loadedGPItems, selectedSite } = this.props;
    if(!loadedHubSites && !loadedGPItems && !loadedGPSites && !loadedHubSites) {
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
          <Menu.Item name="camera" as={Link} to="/">
            <Icon name="camera" />
            Change Site
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
    loadedHubSites: selectorHubSitesLoaded(state),
    loadedGPSites: selectorGPSitesLoaded(state),
    loadedGPItems: selectedGPItemsLoaded(state),
    selectedSite: selectorSelectedHubSite(state)
  };
};

const actions = {
updateSelectedSite,
fetchCardsRequest
};

export default withRouter(connect(mapState, actions)(Layout));
