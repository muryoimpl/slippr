import { combineReducers } from 'redux'

import aspectRatio from './aspectRatio'
import codeStyles from './codeStyle'
import headers from './header'
import pages from './page'
import progressBar from './progressBar'
import textareas from './textarea'
import themes from './theme'

const rootReducer = combineReducers({
  aspectRatio,
  codeStyles,
  headers,
  pages,
  progressBar,
  textareas,
  themes
})

export default rootReducer
