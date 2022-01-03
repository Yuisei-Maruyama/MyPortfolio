import React, { useState, useEffect } from 'react'
import { ProfileCard, Circular, MessageArea, SkillTables } from '@/components'
import { Box } from '@material-ui/core'
import { Issues } from '@/types'
import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api.github.com',
})

const owner = process.env.REACT_APP_USER_NAME

const repo = process.env.REACT_APP_PROJECT

const Main = () => {
  const [todoItems, setTodo] = useState<Issues>([])

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
      <Circular todoItems={todoItems} length={todoItems.length} value={0} />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
        <Box sx={{ width: '20%' }}>
          <ProfileCard />
        </Box>
        <Box sx={{ ml: 12, width: '40%' }}>
          <MessageArea />
        </Box>
      </Box>
      {/* <Baffle /> */}
      {/* <Box sx={{ display: 'flex', marginTop: 15 }} className={classes.body}>
        <History />
      </Box> */}
      <Box sx={{ display: 'flex', width: '90%', margin: '30px auto 0' }}>
        <SkillTables />
      </Box>
    </div>
  )
}

export default Main
