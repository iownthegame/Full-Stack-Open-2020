import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification.timeout) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, notification.timeout * 1000)
      return () => clearTimeout(timer);
    }
  }, [dispatch, notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification.notification) return null

  return (
    <div style={style}>
      {notification.notification}
    </div>
  )
}

export default Notification
