const Notification =({message, type})=>{
    if(message === null){
        return null
    } 
        console.log('ILMOITUS VIESTI : ', message)
        const style = {
            color: type==='error' ? "red" : "green",
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 3,
            padding: 5,
            marginBottom: 10
        }

       return (
            <div id="notification" style={style}>
                {message}
            </div>
        )
   
        
    }

    
    

   


export default Notification
