import { SET_DIMENSION, SET_LOADING } from '../../actions/general/types'

const INITIAL_STATE = {
  loading: false,
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
    default:
      return state
  }
}

export default general
