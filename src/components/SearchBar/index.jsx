import React, { Component } from 'react'
import searchIco from '../../assets/img/ic_Search.png'
import logoML from '../../assets/img/Logo_ML.png'
import PropTypes from 'prop-types'

class SearchBar extends Component {

  state = {
    searchText: '',
  }

  keyDownEvent = (e) => {
    if (e.keyCode === 13) this.handleSearch()
  }

  onChangeSearch = (e) => {
    this.setState({ searchText: e.currentTarget.value })
  }

  handleSearch = () => {
    const { doSearch } = this.props
    const { searchText } = this.state

    if (doSearch) doSearch(searchText)
  }

  render() {
    const { className } = this.props

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
  className: PropTypes.string,
}

export default SearchBar
