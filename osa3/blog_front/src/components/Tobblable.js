import { forwardRef, useImperativeHandle, useState } from "react"

// komponentin luova funktio on "kääritty" funktiokutsun forwardRef sisälle, eli komponentti pääsee
// käsiksi sille määriteltyyn refiin
const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

     // React hook jonka avulla komponentille (Togglable) voidaan määrittää
     // funktioita joita voidaan kutsua sen ulkopuolelta, eli nyt kun luodaan uusi blogi niin voidaan
     // kutsua tätä
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    )
})

export default Togglable