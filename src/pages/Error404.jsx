import React, { Component } from 'react'
import Helmet from 'react-helmet'

class Error404 extends Component {

  render() {
    return (
      <section className="sec-404">
        <article>
          <div>
            <h1>404</h1>
          </div>
        </article>
        <Helmet title="ML 2019 - Error 404">
          <meta name="description" content="Error 404" />
        </Helmet>
      </section>
    )
  }

}

export default Error404
