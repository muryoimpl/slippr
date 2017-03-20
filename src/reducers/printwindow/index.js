import { combineReducers } from 'redux'

import prints from './print'
import aspectRatio from '../aspectRatio'

const printReducer = combineReducers({
  prints,
  aspectRatio
})

export default printReducer
