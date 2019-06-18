import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './app'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import createStore, { initializeSession } from './helpers/store'
import htmlTemplate from './helpers/Template'
import Helmet from 'react-helmet'
import routes from './routes'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

app.use('/static', express.static(`${__dirname}`))

routes.map((r) => {
  app.get(r.path, (req, res) => {
    const context = {}
    const store = createStore()
    store.dispatch(initializeSession())
    const dataRequirements = routes
      .filter(route => matchPath(req.url, route)) // filter matching paths
      .map(route => route.component) // map to components
      .filter(comp => comp.serverFetch) // check if components have data requirement
      .map(comp => store.dispatch(comp.serverFetch())) // dispatch data requirement

    Promise.all(dataRequirements).then(() => {
      const jsx = (
        <Provider store={store}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </Provider>
      )
      const reactDom = renderToString(jsx)
      const reduxState = store.getState()
      const helmetData = Helmet.renderStatic()

      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(htmlTemplate(reactDom, reduxState, helmetData, req))
    })
  })

  return null
})

app.listen(9000, () => console.log('serving at http://localhost:9000'))
