import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './routes'
import Error404 from './pages/Error404'
import { connect } from 'react-redux'
import { setDimensions } from './actions/general'
import PropTypes from 'prop-types'
import Loading from './components/Loading'
import ScrollToTop from './helpers/ScrollToTop'

class App extends Component {

  async componentDidMount() {
    this.updateDimensions()
    if (window) {
      window.addEventListener('resize', this.updateDimensions.bind(this))
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  updateDimensions = () => {
    const { setDimensions: setDimensionsAction } = this.props
    if (window) setDimensionsAction(window.innerWidth)
  }

  render() {
    const { loading } = this.props

    return (
      <ScrollToTop>
        {loading && <Loading />}
        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </ScrollToTop>
    )
  }

}

function actionsCreator() {
  return {
    setDimensions,
  }
}

function mapStateToProps({ generalReducer }) {
  return {
    ...generalReducer,
  }
}

App.propTypes = {
  setDimensions: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(
  mapStateToProps,
  actionsCreator(),
)(App)
