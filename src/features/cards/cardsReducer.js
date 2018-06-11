import {createReducer} from '../../app/util/reducerUtil'
import {SUBMIT_NEW_CARD, SUBMIT_NEW_CARD_SUCCESS, SUBMIT_NEW_CARD_ERROR, FETCH_CARDS_ERROR,FETCH_CARDS_REQUEST,FETCH_CARDS_SUCESS} from './cardsConstants'

const initialState = {
    submitting: false,
    saved: false,
    byIds: {},
    listing: [],
    loaded: false,
    loading: false,
    error: null,
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
        return { ...prev, [next.Id]: next}
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

export default createReducer(initialState, {
    [SUBMIT_NEW_CARD]: submitNewCard,
    [SUBMIT_NEW_CARD_SUCCESS]: submitNewCardSuccess,
    [SUBMIT_NEW_CARD_ERROR]: submitNewCardError,
    [FETCH_CARDS_REQUEST]: fetchCards,
    [FETCH_CARDS_SUCESS]: fetchCardsSuccess,
    [FETCH_CARDS_ERROR]: fetchCardError
})