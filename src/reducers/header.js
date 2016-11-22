import * as Types from '../constants/header'

const initialState = {
  filename: 'Not selected'
}

export default function headers (state = initialState, action) {
  switch (action.type) {
    case Types.SET_FILE_NAME:
      return Object.assign({}, state, { filename: action.filename })
      // TODO: object return ここでちゃんとオブジェクトを返すべし
    case Types.SHOW_DEFAULT:
    default:
      return state
  }
}
