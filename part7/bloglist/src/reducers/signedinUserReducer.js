export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}

const signedinUserReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.user
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export default signedinUserReducer
