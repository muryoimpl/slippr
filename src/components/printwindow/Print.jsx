import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import AspectStyle from '../../components/AspectStyle'
import { renderPrintHtmlPage } from '../../utils/markdownConverter'
import * as printActions from '../../actions/printwindow/print'
import * as aspectRatioActions from '../../actions/aspectRatio'

class Print extends React.Component {
  componentDidMount () {
    const { store } = this.context

    ipcRenderer.on('reply-get-print-target', (event, json) => {
      store.dispatch(printActions.displayPrintPage(json.markdown, json.theme))
      store.dispatch(aspectRatioActions.selectRatio(json.ratio))
      this.render()
    })

    ipcRenderer.on('reply-print-page', (event, json) => {
      window.close()
    })

    ipcRenderer.send('get-print-target')
  }

  handlePrintPDF () {
    ipcRenderer.send('print-pdf')
  }

  render () {
    const { markdown, theme } = this.props

    return (
      <div className="p-print-page">
        <AspectStyle />
        <button className="pull-right print-hidden" onClick={(e) => this.handlePrintPDF()}>print</button>
        <div className="p-print-page" dangerouslySetInnerHTML={{__html: renderPrintHtmlPage(markdown, theme)}} />
      </div>
    )
  }
}

Print.propTypes = {
  theme: PropTypes.string,
  markdown: PropTypes.string
}

Print.contextTypes = {
  store: PropTypes.object
}

export default connect((state) => {
  return {
    markdown: state.prints.markdown,
    theme: state.prints.theme
  }
})(Print)
