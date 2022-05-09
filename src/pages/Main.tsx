import React, { useState, useEffect, createContext } from 'react'
import {
  FlippedCard,
  ProfileFrontCard,
  ProfileBackCard,
  Circular,
  MessageArea,
  SkillTable,
  SkillTables,
} from '@/components'
import { Box } from '@material-ui/core'
import { Issues } from '@/types'
import axios from 'axios'
import { useFlipped } from '@/customHooks'
import { skillTableData } from '@/data/skillTableData'

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
  const { isFlipped, handleSetFlipped } = useFlipped()
  const { frontEndProps, backEndProps } = skillTableData()

  const fetchTodo = async () => {
    const labelName = 'Todo'
    const { data } = await request.get(`/repos/${owner}/${repo}/issues?labels=${labelName}&state=all`)
    setTodo(data)
  }

  const message = `I'm Yuisei Maruyama.\n
  My motto is to work while having fun!!\n
  Interested in Front-End of web technology.\n
  Especially technology of interest is React.\n
  In the future, I wanna be a mobile developer.\n
  Mobile developers are expected to be able to give more people a great experience.\n
  In order to reach my goal, I think it is essential to learn React.\n
  `

  useEffect(() => {
    fetchTodo()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <SliderContext.Provider value={contextValue}>
        <Circular items={todoItems} length={todoItems.length} value={0} />
      </SliderContext.Provider>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
        <Box sx={{ width: '20%' }}>
          <FlippedCard isFlipped={isFlipped} setFlipped={handleSetFlipped}>
            <ProfileFrontCard
              width="300px"
              height="450px"
              imageSrc="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/main/public/assets/Profile.jpg?raw=true"
            />
            <ProfileBackCard width="300px" height="450px" />
          </FlippedCard>
        </Box>
        <Box sx={{ ml: 12, width: '40%' }}>
          <MessageArea message={message} speed={50} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '90%', margin: '30px auto 0' }}>
        <SkillTables>
          <SkillTable
            title="Front-End Goal Image"
            link="https://github.com/Yuisei-Maruyama/MyPortfolio"
            frontEndProps={frontEndProps}
          />
          <SkillTable
            title="Back-End Goal Image"
            link="https://github.com/Yuisei-Maruyama/MyPortfolio_Backend"
            backEndProps={backEndProps}
          />
        </SkillTables>
      </Box>
    </div>
  )
}

export default Main
