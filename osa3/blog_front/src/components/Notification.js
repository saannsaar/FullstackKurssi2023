const Notification =({notification})=>{
    if(notification === null){
        return null
    }

    const style = {
        color: notification.type === 'alert' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 14,
        borderStyle: 'dotted',
        borderRadius: 3,
        padding: 5,
        marginBottom: 10
    }
    console.log('ILMOITUS VIESTI : ', notification)

    return(
        <div id="notification" style={style}>
            {notification}
        </div>
    )
}

export default Notification
