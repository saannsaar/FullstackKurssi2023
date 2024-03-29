import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {

        console.log(event.target.type, event.target.value)
        setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
    }

    return {
        type,
        value,
        reset,
        onChange
    }
}

