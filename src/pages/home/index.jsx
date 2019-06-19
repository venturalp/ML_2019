import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { setLoading, search } from '../../actions/general'
import SearchBar from '../../components/SearchBar'
import { Link } from 'react-router-dom'

class Home extends Component {

  doSearch = (searchText) => {
    const { history } = this.props
    history.push(`./items?search=${searchText}`)
  }

  render() {
    return (
      <article>
        <SearchBar doSearch={this.doSearch} />
        <Link to="./items">Teste</Link>
        <Helmet title="Home">
          <meta name="description" content="Description tag" />
        </Helmet>
      </article>
    )
  }

}

function actionsCreator() {
  return {
    setLoading,
    search,
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
)(Home)
