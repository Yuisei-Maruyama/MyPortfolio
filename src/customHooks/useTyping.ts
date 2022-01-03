import { useState } from 'react'

const useTyping = () => {
  const [message, setMessage] = useState("My name is Yuisei Maruyama. I'm interested in Front-End technology.")
  const [key, setKey] = useState(0)
  const [inputRock, setRock] = useState(false)

  const typeStart = (text = '') => {
    setKey((current) => current + 1)
    setRock(true)
    setMessage(text)
  }

  const typeEnd = () => {
    setRock(false)
  }

  return {
    typeStart,
    typeEnd,
    inputRock,
    key,
    message,
  }
}

export default useTyping
