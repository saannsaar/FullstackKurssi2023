import { useNotificationValue, useNotificationDispatch } from "../NotificationContext"

const Notification = () => {
 const dispatch = useNotificationDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  setTimeout(() => {
    dispatch({
      type: 'NO_NOTIFICATION',
      payload: null
    })
  }, 5000)
  
const notification = useNotificationValue()
console.log(notification)

// Jos ei tarvita ilmoitusta, palautetaan tyhjä näy tyhjää laatikkoa sivulla
if (!notification) {
  return null
}

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
