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
    typeStart(`I'm Yuisei Maruyama.\n
    My motto is to work while having fun !!\n
    Interested in Front-End of web technology.\n
    Especially technology of interest is React.\n
    In the future, I wanna be a mobile developer.\n
    Mobile developers are expected to be able to give more people a great experience.\n
    In order to reach my goal, I think it is essential to learn React.\n
    `
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
