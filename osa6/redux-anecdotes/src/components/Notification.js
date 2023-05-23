import { useSelector } from "react-redux"
import { addNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification)


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 4,
    borderColor: 'gold'
  }
  if (notification === '') {
    return null
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification