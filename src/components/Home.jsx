import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
  render () {
    const { markdown } = this.props

    return (
      <div className="pane-group">
        <div className="pane">
          <form>
            <div className="form-group">
              <textarea className="form-control" rows="10" value={markdown}></textarea>
            </div>
          </form>
        </div>
        <div className="pane">
          hi
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  markdown: PropTypes.string
}

export default connect((state) => {
  return {
    markdown: state.homes.markdown
  }
})(Home)
