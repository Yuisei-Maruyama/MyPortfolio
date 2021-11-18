import React from 'react'
import { ProfileCard, History, Circular, MessageArea } from '@/components'
// import classes from './Main.module.scss'
import { Box } from '@material-ui/core'

const Main = () => {
  return (
    <div>
      Main
      <Circular length={6} value={0} />
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
