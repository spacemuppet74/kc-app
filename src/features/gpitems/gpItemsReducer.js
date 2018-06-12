import { createReducer } from "../../app/util/reducerUtil";
import { createSelector } from "reselect";

import {
  FETCH_GP_ITEMS_REQUEST,
  FETCH_GP_ITEMS_SUCCESS,
  FETCH_GP_ITEMS_ERROR
} from "./gpItemsConstant";

const initialState = {
  loading: false,
  loaded: false,
  byIds: {},
  listing: [],
  error: null
};

const fetchGPItemsRequest = state => {
  return {
    ...state,
    loading: true
  };
};

const fetchGPItemsSuccess = (state, payload) => {
  const byIds = payload.items.reduce((prev, next) => {
    return {
      ...prev,
      [next.ID]: next
    };
  }, {});

  const listing = Object.keys(byIds);

  return {
    ...state,
    loading: false,
    loaded: true,
    byIds: { ...byIds },
    listing: [...listing]
  };
};

const fetchGPItemsError = (state, payload) => {
  return {
    loading: false,
    error: payload.error
  };
};

export default createReducer(initialState, {
  [FETCH_GP_ITEMS_REQUEST]: fetchGPItemsRequest,
  [FETCH_GP_ITEMS_SUCCESS]: fetchGPItemsSuccess,
  [FETCH_GP_ITEMS_ERROR]: fetchGPItemsError
});

export const gpListing = state => state.gpItems.listing;
export const gpItems = state => state.gpItems.byIds;
export const selectorGPItemsLoading = state => state.gpItems.loading
const checkedLoaded = state => state.gpItems.loaded

export const getGPItemsSelector = createSelector(
  gpListing,
  gpItems,
  (listing, gpItems) => {
    const res = listing.reduce((prev, next) => {
      const item = gpItems[next];
      let uofm = item.UOFM.trim().toLowerCase();

      if (prev[uofm]) {
        prev[uofm].results = [
          ...prev[uofm].results,
          {
            title: item.ItemCode.trim(),
            description: item.UOMDescription.trim(),
            gpcode: item.ID.trim()
          }
        ];
      } else {
        prev[uofm] = {
          name: uofm,
          results: [
            {
              title: item.ItemCode.trim(),
              description: item.UOMDescription.trim(),
              gpcode: item.ID.trim()
            }
          ]
        };
      }

      return { ...prev };
    }, {});
    return res;
  }
);

export const gpItemsTree = createSelector(gpItems, items => {
  const listing = Object.values(items);
  const res = listing.reduce((prev, next) => {
    let uofm = next.UOFM.trim().toLowerCase();

    if (prev[uofm]) {
      prev[uofm].results = [
        ...prev[uofm].results,
        {
          title: next.ItemCode.trim(),
          description: next.ITEMDESC.trim(),
          itemcode: next.ID
        }
      ];
    } else {
      prev[uofm] = {
        name: uofm,
        results: [
          {
            title: next.ItemCode.trim(),
            description: next.UOMDescription.trim(),
            itemcode: next.ID
          }
        ]
      };
    }

    return { ...prev };
  }, {});
  return res;
});

export const selectedGPItemsLoaded = createSelector(
  [checkedLoaded],
  (checkedLoaded) => checkedLoaded
)