// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
// import user from './user'

const rootReducer = combineReducers({
  auth,
  // user
})

export default rootReducer
