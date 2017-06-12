import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as ratioActions from '../actions/aspectRatio'
import * as Settings from '../constants/settings'
import * as storage from '../utils/localStorage'

class AspectRatio extends React.Component {
  componentDidMount () {
    const { store } = this.context

    const previousSelected = storage.get('ratio')
    if (previousSelected) {
      store.dispatch(ratioActions.selectRatio(previousSelected))
    }
  }

  handleSelectRatio (e) {
    const { store } = this.context

    storage.set('ratio', e.target.value)
    store.dispatch(ratioActions.selectRatio(e.target.value))
  }

  render () {
    const { ratio } = this.props

    return (
      <select className="form-control p-aspect-ratio__selectbox" value={ratio} onChange={e => this.handleSelectRatio(e)}>
        {Settings.ASPECT_RATIO.map((ratio) => {
          return (
            <option value={ratio.value} key={ratio.value}>{ratio.label}</option>
          )
        })}
      </select>
    )
  }
}

AspectRatio.contextTypes = {
  store: PropTypes.object
}

AspectRatio.propTypes = {
  ratio: PropTypes.number
}

export default connect((state) => {
  return {
    ratio: state.aspectRatio.ratio
  }
})(AspectRatio)
