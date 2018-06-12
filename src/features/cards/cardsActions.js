import {SUBMIT_NEW_CARD, SUBMIT_NEW_CARD_ERROR,SUBMIT_NEW_CARD_SUCCESS, FETCH_CARDS_ERROR,FETCH_CARDS_REQUEST,FETCH_CARDS_SUCESS, SELECT_CARD} from './cardsConstants'
import { submitNewCard, getCards } from './card-api'


const submitForm = () => {
    return {
        type: SUBMIT_NEW_CARD
    }
}

const submitFormSuccess = () => {
    return {
        type: SUBMIT_NEW_CARD_SUCCESS
    }
}

const submitFormError = () => {
    return {
        type: SUBMIT_NEW_CARD_ERROR
    }
}

export const submitFormRequest = (card) => {
    return async (dispatch, getState) => {
        try {
            debugger
            dispatch(submitForm())
            const site = getState().hubSites.selectedSite.Id
            const newCard = submitNewCard(card, site)
            console.log('new card ', newCard)
            dispatch(submitFormSuccess())
            
        } catch (error) {
            console.log('error submitting form ', error)
            dispatch(submitFormError(error))
        }
    }
}


const fetchCards = () => {
    return {
        type: FETCH_CARDS_REQUEST
    }
}

const fetchCardsSuccess = (cards) => {
    return {
        type: FETCH_CARDS_SUCESS,
        payload: {
            cards
        }
    }
}

const fetchCardsError = (error) => {
    return {
        type: FETCH_CARDS_ERROR,
        payload: {
            error
        }
    }
}

export const fetchCardsRequest = (site) => {
    return async dispatch => {
        try {
            dispatch(fetchCards())
            const cards = await getCards(site)
            dispatch(fetchCardsSuccess(cards))
            
        } catch (error) {
            console.log('fetching cards ', error)
            dispatch(fetchCardsError(error))
        }
    }
}

export const selectCard = (cardID) => {
    return {
        type: SELECT_CARD,
        payload: {
            cardID
        }
    }
}