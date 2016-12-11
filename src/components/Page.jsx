import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { renderHtmlPage } from '../utils/markdownConverter'

class Page extends React.Component {
  render () {
    const { markdownPages, idx } = this.props

    return (
      <div className="p-page theBridge">
        <div className="p-page__inner" dangerouslySetInnerHTML={ {__html: renderHtmlPage(markdownPages[idx])} } />
      </div>
    )
  }
}

Page.propTypes = {
  markdown: PropTypes.string.isRequired,
  markdownPages: PropTypes.array,
  idx: PropTypes.number
}

Page.contextTypes = {
  store: PropTypes.object
}

export default connect((state) => {
  return {
    markdown: state.homes.markdown,
    markdownPages: state.pages.markdownPages,
    idx: state.pages.idx
  }
})(Page)
