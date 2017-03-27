import { combineReducers } from 'redux'

import prints from './print'
import aspectRatio from '../aspectRatio'
import codeStyles from '../codeStyle'

const printReducer = combineReducers({
  prints,
  aspectRatio,
  codeStyles
})

export default printReducer
