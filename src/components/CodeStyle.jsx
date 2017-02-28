import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { HighlightTheme } from '../constants/highlightClass'

import * as codeStyleActions from '../actions/codeStyle'

class CodeStyle extends React.Component {
  handleSelectHighlightTheme (e) {
    const { store } = this.context

    store.dispatch(codeStyleActions.selectHighlightTheme(e.target.value))
  }

  render () {
    const { selected } = this.props

    return (
      <select className="form-control p-code-highlight__selectbox" value={selected} onChange={e => this.handleSelectHighlightTheme(e)}>
        {HighlightTheme.map((theme) => {
          return (
            <option value={theme} key={theme}>{theme}</option>
          )
        })}
      </select>
    )
  }
}

CodeStyle.propTypes = {
  selected: PropTypes.string
}

CodeStyle.contextTypes = {
  store: PropTypes.object
}

export default connect((state) => {
  return {
    selected: state.codeStyles.selected
  }
})(CodeStyle)
