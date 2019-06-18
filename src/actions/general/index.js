import { SEARCH, SET_DIMENSION, SET_LOADING } from './types'

import fetch from 'isomorphic-fetch'

export const search = searchQuery => async (dispatch) => {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    dispatch({
      type: SEARCH,
      payload: result,
    })
  } catch (err) {
    console.log('Err do search', err)
    dispatch({
      type: SEARCH,
      payload: { error: true, msg: 'Erro ao tentar efetuar busca' },
    })
  }
}

export const setDimensions = value => dispatch =>
  dispatch({
    type: SET_DIMENSION,
    payload: value,
  })

export const setLoading = value => ({
  type: SET_LOADING,
  payload: value,
})
