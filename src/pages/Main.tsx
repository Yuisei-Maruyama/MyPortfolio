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
import { Grid } from '@mui/material'
import { Issues } from '@/types'
import axios from 'axios'
import { useFlipped } from '@/customHooks'
import { skillTableData } from '@/data/skillTableData'
import { message } from '@/data/message'

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

  useEffect(() => {
    fetchTodo()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <SliderContext.Provider value={contextValue}>
        <Grid container>
          <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
            <Circular items={todoItems} length={todoItems.length} value={0} />
          </Grid>
        </Grid>
      </SliderContext.Provider>
      <Grid container gap={12} sx={{ mt: 6 }}>
        <Grid lg={1} xl={1} />
        <Grid item sm={6} xs={5} md={4} lg={3} xl={2}>
          <FlippedCard isFlipped={isFlipped} setFlipped={handleSetFlipped}>
            <ProfileFrontCard
              width="100%"
              height="450px"
              imageSrc="https://avatars.githubusercontent.com/u/76277215?v=4"
            />
            <ProfileBackCard width="100%" height="450px" />
          </FlippedCard>
        </Grid>
        <Grid item sm={10} xs={8} md={7} lg={5} xl={5}>
          <MessageArea message={message} speed={50} />
        </Grid>
        <Grid lg={1} xl={1} />
      </Grid>
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
