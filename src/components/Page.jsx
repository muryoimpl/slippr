import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { renderHtmlPage } from '../utils/markdownConverter'
import * as pageActions from '../actions/page'

const KEY_LEFT_ARROW = 37
const KEY_UP_ARROW = 38
const KEY_RIGHT_ARROW = 39
const KEY_DOWN_ARROW = 40

class Page extends React.Component {
  constructor () {
    super()
    // こうしないと、this が event のコンテキストになる
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleOnKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleOnKeyDown)
  }

  handleOnKeyDown (event) {
    const { markdownPages, idx } = this.props

    if (this.isNextPageKey(event.keyCode) && idx < markdownPages.length - 1) {
      const nextIdx = idx + 1
      this.updatePageIndex(nextIdx)
      this.transitionTo(nextIdx)
    }

    if (this.isPrevPageKey(event.keyCode) && idx > 0) {
      const prevIdx = idx - 1
      this.updatePageIndex(prevIdx)
      this.transitionTo(prevIdx)
    }
  }

  updatePageIndex (idx) {
    const { store } = this.context

    const idxToNumber = Number(idx)
    store.dispatch(pageActions.updatePageIndex(idxToNumber))
  }

  transitionTo (nextIdx) {
    const { router } = this.context

    this.updatePageIndex(nextIdx)
    return router.push({ pathname: `/pages/${nextIdx}` })
  }

  isNextPageKey (keyCode) {
    return keyCode === KEY_RIGHT_ARROW || keyCode === KEY_UP_ARROW
  }

  isPrevPageKey (keyCode) {
    return keyCode === KEY_LEFT_ARROW || keyCode === KEY_DOWN_ARROW
  }

  render () {
    const { markdownPages, idx } = this.props

    return (
      <div className="p-page theBridge" onKeyDown={(e) => this.handleOnKeyDown}>
        <div className="p-page__inner" dangerouslySetInnerHTML={ {__html: renderHtmlPage(markdownPages[idx])} } />
      </div>
    )
  }
}

Page.propTypes = {
  markdown: PropTypes.string,
  markdownPages: PropTypes.array,
  idx: PropTypes.number
}

Page.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
}

export default connect((state) => {
  return {
    markdown: state.homes.markdown,
    markdownPages: state.pages.markdownPages,
    idx: state.pages.idx
  }
})(Page)
