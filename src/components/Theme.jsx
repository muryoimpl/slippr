import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { ThemeClasses } from '../constants/themeClass'
import * as themeActions from '../actions/theme'

class Theme extends React.Component {
  handleSelectTheme (e) {
    const { store } = this.context

    store.dispatch(themeActions.selectTheme(e.target.value))
  }

  render () {
    const { selected } = this.props

    return (
      <select className="form-control p-theme__selectbox" value={selected} onChange={e => this.handleSelectTheme(e)}>
        {ThemeClasses.map((theme) => {
          return (
            <option value={theme} key={theme}>theme: {theme}</option>
          )
        })}
      </select>
    )
  }
}

Theme.propTypes = {
  selected: PropTypes.string
}

Theme.contextTypes = {
  store: PropTypes.object
}

export default connect((state) => {
  return {
    selected: state.themes.selected
  }
})(Theme)
