import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import routes from './routes'
import { connect } from 'react-redux'
import { setDimensions, setLoading, search } from './actions/general'
import PropTypes from 'prop-types'
import Loading from './components/Loading'
import ScrollToTop from './helpers/ScrollToTop'
import SearchBar from './components/SearchBar'
import { queryParse } from './helpers/queryHelper'

class App extends Component {

  state = {
    searchText: '',
  }

  async componentDidMount() {
    const { location } = this.props
    if (location.search) {
      const query = queryParse(location.search)
      if (query.search) {
        this.setState({ searchText: query.search })
      }
    }
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

  doSearch = async () => {
    const { searchText } = this.state
    const { history, search: searchAtcion, setLoading: setLoadingAction } = this.props
    if (location.pathname === '/items') {
      setLoadingAction(true)
      await searchAtcion(searchText)
      setLoadingAction(false)
    }
    history.push(`/items?search=${searchText}`)
  }

  changeSearch = value => this.setState({ searchText: value })

  render() {
    const { loading } = this.props
    const { searchText } = this.state

    return (
      <ScrollToTop>
        {loading && <Loading />}
        <SearchBar
          doSearch={this.doSearch}
          searchText={searchText}
          changeSearch={this.changeSearch}
        />
        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} teste="testando" />
          ))}
        </Switch>
      </ScrollToTop>
    )
  }

}

function actionsCreator() {
  return {
    setDimensions,
    search,
    setLoading,
  }
}

function mapStateToProps({ generalReducer }) {
  return {
    ...generalReducer,
  }
}

App.propTypes = {
  setDimensions: PropTypes.func,
  setLoading: PropTypes.func,
  search: PropTypes.func,
  loading: PropTypes.bool,
  history: PropTypes.object,
  location: PropTypes.object,
}

export default withRouter(
  connect(
    mapStateToProps,
    actionsCreator(),
  )(App),
)
