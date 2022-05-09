import React, { useEffect, useCallback } from 'react'
import classes from './MessageArea.module.scss'
import { TypeWriter } from '@/components'
import { useTyping } from '@/customHooks'

type Props = {
  message: string
  speed: number
}

const MessageArea: React.FC<Props> = (props: Props) => {
  const { message, speed } = props
  const { typeStart, typeEnd, ...params } = useTyping()

  const doing = useCallback(() => {
    if ((params as unknown as { message: string }).message) {
      console.log('Type End!')
    }
    typeEnd()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    typeStart(message)
    // eslint-disable-next-line
  }, [])

  return (
    <div className={classes.area}>
      <TypeWriter typeEnd={doing} speed={speed} cursor={true} {...params} />
    </div>
  )
}

export default MessageArea
