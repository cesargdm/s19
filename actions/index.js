export function login(user) {
  return {
    type: 'LOGIN',
    user
  }
}

export function logout() {
  return {
    type: 'LOGOUT'
  }
}

export function setCredentials(user) {
  console.log('SET CREDENTIAL')
  return {
    type: 'SET_CREDENTIALS',
    user
  }
}

export function setUser(user) {
  return {
    type: 'SET_USER',
    user
  }
}
