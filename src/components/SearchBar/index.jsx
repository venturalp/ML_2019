import React, { Component } from 'react'
import searchIco from '../../assets/img/ic_Search.png'
import logoML from '../../assets/img/Logo_ML.png'
import PropTypes from 'prop-types'

class SearchBar extends Component {

  keyDownEvent = (e) => {
    if (e.keyCode === 13) this.handleSearch()
  }

  onChangeSearch = (e) => {
    const { changeSearch } = this.props
    changeSearch(e.currentTarget.value)
  }

  handleSearch = () => {
    const { doSearch } = this.props
    if (doSearch) doSearch()
  }

  render() {
    const { className, searchText } = this.props

    return (
      <div className={`search-bar ${className || ''}`}>
        <div className="container-base">
          <div>
            <img src={logoML} alt="Mercado Livre" />
          </div>
          <div>
            <div>
              <input
                type="text"
                placeholder="Nunca dejes de buscar"
                onKeyDown={this.keyDownEvent}
                onChange={this.onChangeSearch}
                value={searchText}
              />
              <button type="button" onClick={this.handleSearch}>
                <img src={searchIco} alt="Buscar" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

SearchBar.propTypes = {
  doSearch: PropTypes.func,
  changeSearch: PropTypes.func,
  className: PropTypes.string,
  searchText: PropTypes.string,
}

export default SearchBar
