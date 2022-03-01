import React, { useState, useEffect, useRef } from 'react'
import { Typography } from '@mui/material'

type Props = {
  message: string
  typeEnd: () => void
  cursor?: boolean
  className?: string
  speed?: number
}

const TypeWriter: React.FC<Props> = (props: Props) => {
  const { message, typeEnd, cursor, className, speed } = props

  const [text, setText] = useState<string>('')
  const msgRef = useRef(null)

  useEffect(() => {
    const char = message[Symbol.iterator]()
    let timerId: number
    ;(function showChar() {
      const nextChar = char.next()
      if (nextChar.done) {
        typeEnd()
        return
      }
      setText((prevState) => prevState + nextChar.value)
      timerId = setTimeout(showChar, speed)
    })()

    return () => clearTimeout(timerId)
    // eslint-disable-next-line
  }, [])

  // レンダリングのたびに表示エリアをスクロールする
  useEffect(() => {
    const el = msgRef.current
    if (!el) return
    // if (!(el as unknown as { clientHeight: number, scrollHeight: number, scrollTop: number })) return
    if (
      (el as unknown as { clientHeight: number }).clientHeight <
      (el as unknown as { scrollHeight: number }).scrollHeight
    ) {
      ;(el as unknown as { scrollTop: number }).scrollTop =
        (el as unknown as { scrollHeight: number }).scrollHeight -
        (el as unknown as { clientHeight: number }).clientHeight
    }
  })

  return (
    <Typography
      component="div"
      sx={{ fontSize: 20 }}
      ref={msgRef}
      className={className + (cursor ? ' cursor-blink' : '')}
    >
      {text.split('\n').map((txt, index) => (
        <div key={index}> {txt} </div>
      ))}
    </Typography>
  )
}

export default TypeWriter
