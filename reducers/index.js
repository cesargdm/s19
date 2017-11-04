import { AsyncStorage } from 'react-native'
import { combineReducers } from 'redux'

function auth(state = { isLoggedIn: false }, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLoggedIn: true,
        user: action.user
      }
    case 'LOGOUT':
      return {
        user: null,
        isLoggedIn: false
      }
    case 'SET_USER':
      return {
        user: action.user,
        isLoggedIn: true
      }
    default:
      return state
  }
}

const aid = combineReducers({
  auth
})

export default aid
