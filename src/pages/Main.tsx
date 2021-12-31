import React, { useState, useEffect } from 'react'
import { ProfileCard, History, Circular, MessageArea } from '@/components'
// import classes from './Main.module.scss'
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
      Main
      <Circular todoItems={todoItems} length={todoItems.length} value={0} />
      <Box sx={{ display: 'flex' }}>
        <ProfileCard />
        {/* <div style={{ flexGrow: 1 }}></div> */}
        <Box sx={{ ml: 12 }}>
          <MessageArea />
        </Box>
      </Box>
      {/* <Baffle /> */}
      <History />
    </div>
  )
}

export default Main
