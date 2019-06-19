import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { setLoading, search, clearData } from '../../actions/general'
import { queryParse } from '../../helpers/queryHelper'
import PropTypes from 'prop-types'
import LineResult from './LineResult'

class Items extends Component {

  async componentDidMount() {
    const { location, clearData: clearDataAction } = this.props
    clearDataAction()
    if (location.search) {
      const query = queryParse(location.search)
      if (query.search) {
        const { setLoading: setLoadingAction, search: searchAction } = this.props
        setLoadingAction(true)
        await searchAction(query.search)
        setLoadingAction(false)
      }
    }
  }

  render() {
    const {
      searchResult: { items },
      location,
    } = this.props

    let query
    if (location.search) query = queryParse(location.search).search

    return (
      <article className="container-base search-results">
        <p className="breadcrumb">Breadcrumb 1 > Breadcrumb 2 > Breadcrumb 3</p>
        <div className="list-results">
          {items && items.map(i => <LineResult {...i} key={i.id} />)}
        </div>
        <Helmet title={`Resultado da busca ${query || ''}`}>
          <meta name="description" content="Description tag" />
        </Helmet>
      </article>
    )
  }

}

Items.propTypes = {
  location: PropTypes.object,
  setLoading: PropTypes.func,
  search: PropTypes.func,
  clearData: PropTypes.func,
  searchResult: PropTypes.object,
}

function actionsCreator() {
  return {
    setLoading,
    search,
    clearData,
  }
}

function mapStateToProps({ generalReducer }) {
  return {
    ...generalReducer,
  }
}

export default connect(
  mapStateToProps,
  actionsCreator(),
)(Items)
