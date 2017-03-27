import React, {PropTypes} from 'react'
import { connect } from 'react-redux'

import * as Settings from '../constants/settings'

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
      @media screen {
        .p-page__print::before {
          padding-top: ${ratio}%;
        }
      }
      @media print {
        .p-page__print::before {
          padding-top: ${Settings.PRINT_HEIGHT};
        }
      }
      @media print {
        .p-page__print__wide::before {
          padding-top: ${Settings.PRINT_HEIGHT_WIDE};
        }
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
