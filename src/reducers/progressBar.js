import Immutable from 'immutable'
import * as Types from '../constants'

const initialState = Immutable.Map({ value: 0 })

export default function progressBar (state = initialState, action) {
  switch (action.type) {
    case Types.UPDATE_PROGRESS:
      const progress = 100 / (action.size - 1) * action.index

      return Immutable.fromJS(state).merge({ value: progress }).toJS()
    default:
      return state
  }
}
