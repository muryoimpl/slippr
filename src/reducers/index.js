import { combineReducers } from 'redux'

import homes from './home'
import headers from './header'
import pages from './page'
import themes from './theme'
import codeStyles from './codeStyle'
import aspectRatio from './aspectRatio'

const rootReducer = combineReducers({
  headers,
  homes,
  pages,
  themes,
  codeStyles,
  aspectRatio
})

export default rootReducer
