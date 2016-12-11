import { combineReducers } from 'redux'

import homes from './home'
import headers from './header'
import pages from './page'

const rootReducer = combineReducers({
  headers,
  homes,
  pages
})

export default rootReducer
