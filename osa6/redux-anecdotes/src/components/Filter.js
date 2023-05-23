import { changeFilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
     
    const content = event.target.value
    console.log(content)
   
    dispatch(changeFilter(content))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter