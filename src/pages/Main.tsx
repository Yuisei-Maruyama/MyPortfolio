import React, { useState, useEffect, createContext, useCallback } from 'react'
import { FlippedCard, ProfileFrontCard, ProfileBackCard, Circular, MessageArea, SkillTables } from '@/components'
import { Box } from '@material-ui/core'
import { Issues } from '@/types'
import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api.github.com',
})

const owner = process.env.REACT_APP_USER_NAME

const repo = process.env.REACT_APP_PROJECT

export type SliderContextType = {
  specify?: string
}

export const SliderContext = createContext<SliderContextType>({})

const contextValue = {
  specify: 'github-todo',
}

const Main = () => {
  const [todoItems, setTodo] = useState<Issues>([])
  const [isFlipped, setFlipped] = useState<boolean>(false)

  const fetchTodo = async () => {
    const labelName = 'Todo'
    const { data } = await request.get(`/repos/${owner}/${repo}/issues?labels=${labelName}&state=all`)
    setTodo(data)
  }

  useEffect(() => {
    fetchTodo()
    // eslint-disable-next-line
  }, [])

  const handleSetFlipped = useCallback(
    (isFlipped: boolean) => {
      setFlipped(isFlipped)
    },
    [setFlipped]
  )

  return (
    <div>
      <SliderContext.Provider value={contextValue}>
        <Circular items={todoItems} length={todoItems.length} value={0} />
      </SliderContext.Provider>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
        <Box sx={{ width: '20%' }}>
          <FlippedCard isFlipped={isFlipped} setFlipped={handleSetFlipped}>
            <ProfileFrontCard height="450px" />
            <ProfileBackCard height="450px" />
          </FlippedCard>
        </Box>
        <Box sx={{ ml: 12, width: '40%' }}>
          <MessageArea />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '90%', margin: '30px auto 0' }}>
        <SkillTables />
      </Box>
    </div>
  )
}

export default Main
