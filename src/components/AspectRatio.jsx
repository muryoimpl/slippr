import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as ratioActions from '../actions/aspectRatio'
import * as Settings from '../constants/settings'

class AspectRatio extends React.Component {
  handleSelectRatio (e) {
    const { store } = this.context

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
