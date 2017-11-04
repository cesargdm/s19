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
      AsyncStorage.removeItem('credentials')
      return {
        user: null,
        isLoggedIn: false
      }
    case 'SET_CREDENTIALS':
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
