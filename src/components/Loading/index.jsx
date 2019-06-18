import React from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'

const Loading = (props) => {
  const { className, type, size, color = 'red' } = props

  return (
    <div className={`loading-full ${className || ''}`}>
      <div className="bg-loading" />
      <ReactLoading
        className="loading-ico"
        type={type || 'spin'}
        width={size || 45}
        height={size || 45}
        color={color}
      />
    </div>
  )
}

Loading.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
}

export default Loading
