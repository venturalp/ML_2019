import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import './scss/main.scss'
import { Provider } from 'react-redux'
import createStore from './helpers/store'

const store = createStore(window.REDUX_DATA)

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
)
