import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification =() => {

  const notification = useSelector(state => state.notification)
  console.log(notification)

  if(!notification){
    console.log('TYHJÄ NOTI')
    return null
  }



  return (
    <div >

      <Alert severity="success">
        {notification.noti}
      </Alert>
    </div>
  )


}







export default Notification
