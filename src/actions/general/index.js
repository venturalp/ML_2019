import { SEARCH, SET_DIMENSION, SET_LOADING, GET_PRODUCT, CLEAR_DATA } from './types'

import fetch from 'isomorphic-fetch'

export const search = searchQuery => async (dispatch) => {
  try {
    const response = await fetch(`/api/items?q=${searchQuery}`, {
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

export const clearData = () => ({ type: CLEAR_DATA })

export const getProduct = id => async (dispatch) => {
  try {
    const response = await fetch(`/api/items/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json()
    dispatch({
      type: GET_PRODUCT,
      payload: result,
    })
  } catch (err) {
    console.log('Err get Produtct', err)
    dispatch({
      type: GET_PRODUCT,
      payload: { error: true, msg: 'Erro ao tentar recuperar dados do produto' },
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
