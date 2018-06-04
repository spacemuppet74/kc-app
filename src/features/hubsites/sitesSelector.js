import { createSelector } from 'reselect'

const getSitesSelector = state => state.sites.listing

const getSiteSelector = (state, props) => state.sites.byIds[props.siteID]

export const makeGetSite = () => {
  return createSelector(
    [getSitesSelector, getSiteSelector],
    (sites, site) => {
      return site
    }
  )
}