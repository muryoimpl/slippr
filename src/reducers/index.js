import { combineReducers } from 'redux'

import homes from './home'
import headers from './header'
import pages from './page'
import themes from './theme'

const rootReducer = combineReducers({
  headers,
  homes,
  pages,
  themes
})

export default rootReducer
