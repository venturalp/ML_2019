import { SET_DIMENSION, SET_LOADING, SEARCH } from '../../actions/general/types'

const INITIAL_STATE = {
  loading: false,
  searchResult: {},
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
    default:
      return state
  }
}

export default general
