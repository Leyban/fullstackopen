import { useState } from 'react'

export const useInput = (type = 'text') => {
  const [value, setValue] = useState('')

  const onChange = ({ target }) => {
    setValue(target.value)
  }

  const clear = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    clear,
  }
}
