import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as homeActions from '../actions/home'
import { renderHtml } from '../utils/markdownConverter'

class Home extends React.Component {
  handleTextaraChange (e) {
    const { store } = this.context

    store.dispatch(homeActions.editTextareaValue(e.target.value))
  }

  render () {
    const { markdown } = this.props

    return (
      <div className="pane-group">
        <div className="pane">
          <form className="p-editor__pane">
            <div className="form-group p-editor__pane">
              <textarea className="form-control p-editor__textarea" rows="10" value={markdown} onChange={e => this.handleTextaraChange(e)}></textarea>
            </div>
          </form>
        </div>
        <div className="pane p-preview">
          <div dangerouslySetInnerHTML={{__html: renderHtml(markdown)}} />
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  markdown: PropTypes.string
}

Home.contextTypes = {
  store: PropTypes.object
}

export default connect((state) => {
  return {
    markdown: state.homes.markdown
  }
})(Home)
