import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { setLoading } from '../../actions/general'
import teste from '../../assets/img/ic_shipping.png'

class Home extends Component {

  render() {
    return (
      <article>
        HOME
        <img src={teste} alt="teste" />
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
  }
}

function mapStateToProps({ general }) {
  return {
    ...general,
  }
}

export default connect(
  mapStateToProps,
  actionsCreator(),
)(Home)
