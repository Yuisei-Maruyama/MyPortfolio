import React, { useEffect, useCallback } from 'react'
import classes from './MessageArea.module.scss'
import { TypeWriter } from '@/components'
import { useTyping } from '@/customHooks'

const MessageArea: React.FC = () => {
  const { typeStart ,typeEnd, ...params } = useTyping()

  const doing = useCallback(() => {
    if ((params as unknown as { message: string }).message) {
      console.log('Type End!')
    }
    typeEnd()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    typeStart(`My name is Yuisei Maruyama.\nI'm interested in Front-End technology.`
  )
    // eslint-disable-next-line
  }, [])

  return (
    <div className={classes.area}>
      <TypeWriter typeEnd={doing} speed={50} cursor={true} {...params} />
    </div>
  )
}

export default MessageArea
