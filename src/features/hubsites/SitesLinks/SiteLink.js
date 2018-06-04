import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './SiteLink.scss'

import { makeGetSite } from '../sitesSelector'

const SiteLink = ({ site }) => {
  return (
    <Button size="huge" basic className="Site-Link-Button" as={Link} to={`/${site.Title}`}>{site.Title}</Button>
  )
}

const makeMapState = () => {
  const getSite = makeGetSite()
  const mapState = (state, props) => {
    return {
      site: getSite(state, props)
    }
  }
  return mapState
}

export default connect(makeMapState)(SiteLink);