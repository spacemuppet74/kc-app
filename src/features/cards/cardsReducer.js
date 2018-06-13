import {createReducer} from '../../app/util/reducerUtil'
import { createSelector } from 'reselect'
import {SUBMIT_NEW_CARD, SUBMIT_NEW_CARD_SUCCESS, SUBMIT_NEW_CARD_ERROR, FETCH_CARDS_ERROR,FETCH_CARDS_REQUEST,FETCH_CARDS_SUCESS,SELECT_CARD} from './cardsConstants'

const initialState = {
    submitting: false,
    saved: false,
    byIds: {},
    listing: [],
    loaded: false,
    loading: false,
    error: null,
    selectedCard: null
}

const submitNewCard = (state,payload) => {
    return {
        ...state,
        submitting: true
    }
}

const submitNewCardSuccess = (state, payload) => {
    return {
        ...state,
        submitting: false,
        saved: true
    }
}

const submitNewCardError = (state, payload) => {
    return {
        ...state,
        submitting: false,
        saved: false,
        error: payload.error
    }
}

const fetchCards = (state) => {
    return {
        ...state,
        loading: true
    }
}

const fetchCardsSuccess = (state, payload) => {
    const byIds = payload.cards.reduce((prev, next)=> {
        return { ...prev, [next.Id]: {...next}}
    }, {})

    const listing = Object.keys(byIds)
    return {
        ...state,
        loading: false,
        loaded: true,
        byIds: {...byIds},
        listing: [...listing]

    }
}

const fetchCardError = (state, payload) => {
    return {
        ...state,
        loading: false,
        error: payload.error
    }
}

const selectCard = (state, payload) => {
    const cardId = parseInt(payload.cardID, 10)
    let selectedCard
    if(state.selectedCard === cardId) {
        selectedCard = null
    } else {
        selectedCard = cardId
    }

    return {
        ...state,
        selectedCard
    }
}

export default createReducer(initialState, {
    [SUBMIT_NEW_CARD]: submitNewCard,
    [SUBMIT_NEW_CARD_SUCCESS]: submitNewCardSuccess,
    [SUBMIT_NEW_CARD_ERROR]: submitNewCardError,
    [FETCH_CARDS_REQUEST]: fetchCards,
    [FETCH_CARDS_SUCESS]: fetchCardsSuccess,
    [FETCH_CARDS_ERROR]: fetchCardError,
    [SELECT_CARD]: selectCard
})

const selectedCard = state => state.cards.selectedCard
const cards = state => state.cards.byIds
const gpItems = state => state.gpItems.byIds
const gpSites = state => state.gpSites.byIds
const sites  = state => state.hubSites.byIds
const stores = state => state.stores.byIds


export const cardDetails = createSelector(
    [selectedCard,cards, gpItems, gpSites, sites, stores],
    (selectedCard,cards, gpItems, gpSites, sites, stores) => {
        const card = cards[selectedCard]
        const gpItem = gpItems[card.gp_item_id]
        const gpSite = gpSites[card.gp_location]
        const site = sites[card.siteId]
        const store = stores[card.store_locationId]

        return {
            card,
            gpItem,
            gpSite,
            site,
            store
        }

        
    }
)