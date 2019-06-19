import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { setLoading, search } from '../../actions/general'
import teste from '../../assets/img/ic_shipping.png'
import { queryParse } from '../../helpers/queryHelper'
import PropTypes from 'prop-types'

class Items extends Component {

  async componentDidMount() {
    console.log('AQUI')
    const { location } = this.props
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
    console.log('render item AQUI')

    return (
      <article>
        ITEMS
        <img src={teste} alt="teste" />
        <Helmet title="Items">
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
)(Items)
