import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { setLoading, getProduct, clearData } from '../../actions/general'
import { pad } from '../../helpers/utils'
import PropTypes from 'prop-types'

class Item extends Component {

  async componentDidMount() {
    const { match, clearData: clearDataAction } = this.props
    clearDataAction()
    if (match.params && match.params.id) {
      const { setLoading: setLoadingAction, getProduct: getProductAction } = this.props
      setLoadingAction(true)
      await getProductAction(match.params.id)
      setLoadingAction(false)
    }
  }

  render() {
    const {
      productInfo: { item },
      productInfo,
    } = this.props

    return (
      <article className="container-base product-page">
        <p className="breadcrumb">Breadcrumb 1 > Breadcrumb 2 > Breadcrumb 3</p>
        {item && (
          <div className="product-info">
            <div className="image-description">
              <div className="picture">
                <img src={item.picture} alt={item.title} />
              </div>
              <h2>Descrição do produto</h2>
              <p>{item.description}</p>
            </div>
            <div className="block-buy">
              <p>{`${item.condition} - ${item.sold_quantity} vendidos`}</p>
              <h1>{item.title}</h1>
              <h2>{`$${item.price.amount},${pad(item.price.decimals, 2)}`}</h2>
              <div className="btn-comprar">Comprar</div>
            </div>
          </div>
        )}
        <Helmet
          title={`Detalhe de produto ${
            productInfo && !productInfo.error && productInfo.item ? productInfo.item.title : ''
          }`}
        >
          <meta name="description" content="Description tag" />
        </Helmet>
      </article>
    )
  }

}

Item.propTypes = {
  match: PropTypes.object,
  productInfo: PropTypes.object,
  setLoading: PropTypes.func,
  getProduct: PropTypes.func,
  clearData: PropTypes.func,
}

function actionsCreator() {
  return {
    setLoading,
    getProduct,
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
)(Item)
