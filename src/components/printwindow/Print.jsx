import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import AspectStyle from '../../components/AspectStyle'
import HighlightCssLink from '../../components/HighlightCssLink'
import { renderPrintHtmlPage } from '../../utils/markdownConverter'
import * as printActions from '../../actions/printwindow/print'
import * as aspectRatioActions from '../../actions/aspectRatio'
import * as codeStyleActions from '../../actions/codeStyle'
import {WIDE} from '../../constants/settings'

class Print extends React.Component {
  componentDidMount () {
    const { store } = this.context

    ipcRenderer.on('reply-get-print-target', (event, json) => {
      store.dispatch(printActions.displayPrintPage(json.markdown, json.theme))
      store.dispatch(aspectRatioActions.selectRatio(json.ratio))
      store.dispatch(codeStyleActions.selectHighlightTheme(json.highlight))
      this.render()
    })

    ipcRenderer.on('reply-print-page', (event, json) => {
      window.close()
    })

    ipcRenderer.send('get-print-target')
  }

  handlePrintPDF (ratio) {
    const isWide = (ratio === WIDE)
    ipcRenderer.send('print-pdf', {isWide: isWide})
  }

  render () {
    const { markdown, theme, ratio } = this.props

    return (
      <div className="p-print-page">
        <AspectStyle />
        <HighlightCssLink />
        <button className="pull-right print-hidden" onClick={(e) => this.handlePrintPDF(ratio)}>print</button>
        <div className="p-print-page" dangerouslySetInnerHTML={{__html: renderPrintHtmlPage(markdown, theme, ratio)}} />
      </div>
    )
  }
}

Print.propTypes = {
  theme: PropTypes.string,
  markdown: PropTypes.string,
  ratio: PropTypes.number
}

Print.contextTypes = {
  store: PropTypes.object
}

export default connect((state) => {
  return {
    markdown: state.prints.markdown,
    theme: state.prints.theme,
    ratio: state.aspectRatio.ratio,
    selected: state.codeStyles.selected
  }
})(Print)
