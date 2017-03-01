import React, {PropTypes} from 'react'
import { connect } from 'react-redux'

class AspectStyle extends React.Component {
  ratioStyle () {
    const { ratio } = this.props

    return `
      .p-page-preview::before {
        padding-top: ${ratio}%;
      }

      .p-page::before {
        padding-top: ${ratio}%;
      }
    `
  }

  render () {
    return (
      <style type="text/css">
      { this.ratioStyle() }
      </style>
    )
  }
}

AspectStyle.propTypes = {
  ratio: PropTypes.number
}

export default connect((state) => {
  return {
    ratio: state.aspectRatio.ratio
  }
})(AspectStyle)