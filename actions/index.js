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


export function setUser(user) {
  return {
    type: 'SET_USER',
    user
  }
}
