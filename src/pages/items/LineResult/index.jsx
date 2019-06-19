/* eslint-disable camelcase */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import imgFrete from '../../../assets/img/ic_shipping.png'
import { Link } from 'react-router-dom'
import { pad } from '../../../helpers/utils'

class LineResult extends Component {

  render() {
    const { id, picture, title, price, state: state_name, free_shipping, className } = this.props

    return (
      <Link to={`/items/${id}`} className={`line-result ${className || ''}`}>
        <div>
          <div className="thumb">
            <img src={picture} alt={title} />
          </div>
        </div>
        <div>
          <div>
            <div className="price">
              <h2>
                {price.amount},{pad(price.decimals, 2)}
              </h2>
              {free_shipping && <img src={imgFrete} alt="Free shipping" />}
            </div>
            <h3>{title}</h3>
          </div>
          <div className="state">{state_name}</div>
        </div>
      </Link>
    )
  }

}

LineResult.propTypes = {
  className: PropTypes.string,
  picture: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.object,
  free_shipping: PropTypes.bool,
  state: PropTypes.string,
}

export default LineResult
