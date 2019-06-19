import {
  SET_DIMENSION,
  SET_LOADING,
  SEARCH,
  GET_PRODUCT,
  CLEAR_DATA,
} from '../../actions/general/types'

const INITIAL_STATE = {
  loading: false,
  searchResult: {},
  productInfo: {},
}

function general(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DIMENSION:
      return {
        ...state,
        wSize: action.payload,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SEARCH:
      return {
        ...state,
        searchResult: action.payload,
      }
    case GET_PRODUCT:
      return {
        ...state,
        productInfo: action.payload,
      }
    case CLEAR_DATA:
      return {
        ...state,
        ...INITIAL_STATE,
      }
    default:
      return state
  }
}

export default general
