export const setNotification = (notification, timeout) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
    timeout
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

const initialState = {
  notification: '',
  timeout: 0
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return { notification: action.notification, timeout: action.timeout }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export default notificationReducer
