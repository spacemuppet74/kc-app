import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import SiteLink from './SiteLink'

const SitesLinks = ({ sites }) => {
  return (
    <Fragment>
      {sites.map(siteID => <SiteLink siteID={siteID} key={siteID} />)}
    </Fragment>
  )
}

const mapState = state => {
  return {
    sites: state.sites.listing
  }
}

export default connect(mapState)(SitesLinks)