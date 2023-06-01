import { useSelector } from 'react-redux'


const Notification =() => {

  const notification = useSelector(state => state.notification)
  console.log(notification)

  if(notification === null){
    return null
  }

  const style = {
    color: notification.notiType === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 3,
    padding: 5,
    marginBottom: 10
  }

  return (
    <div id="notification" style={style}>
      {notification.noti}
    </div>
  )


}







export default Notification
