import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hiddenWhenVisible = { display: visible ? 'none': '' }
  const shownWhenVisible = { display: visible ? '': 'none' }

  useImperativeHandle(ref,() => {
    return {
      toggleVisibility
    }
  })


  return (
    <div>
      <div style={hiddenWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={shownWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>

  )
})

Togglable.displayName = 'Togglable'

export default Togglable