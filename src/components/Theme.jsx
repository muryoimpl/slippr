import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { ThemeClasses } from '../constants/themeClass'
import * as themeActions from '../actions/theme'
import * as storage from '../utils/localStorage'

class Theme extends React.Component {
  componentDidMount () {
    const { store } = this.context

    const previousSelected = storage.get('theme')
    if (previousSelected) {
      store.dispatch(themeActions.selectTheme(previousSelected))
    }
  }

  handleSelectTheme (e) {
    const { store } = this.context

    localStorage.setItem('theme', e.target.value)
    store.dispatch(themeActions.selectTheme(e.target.value))
  }

  render () {
    const { selected } = this.props

    return (
      <select className="form-control p-theme__selectbox" value={selected} onChange={e => this.handleSelectTheme(e)}>
        {ThemeClasses.map((theme) => {
          return (
            <option value={theme} key={theme}>{theme}</option>
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
