import { getUserData } from '../../../auth/utils'

// **  Initial State
const initialState = {
  userData: getUserData()
}

const authReducer = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userData: action.data,
        [action.config.storageTokenKeyName]: action[action.config.storageTokenKeyName],
        [action.config.storageRefreshTokenKeyName]: action[action.config.storageRefreshTokenKeyName]
      }
    case 'LOGOUT':
      const obj = { ...action }
      delete obj.type
      return { ...state, userData: {}, selected: {}, ...obj }
    default:
      return state
  }
}

export default authReducer
