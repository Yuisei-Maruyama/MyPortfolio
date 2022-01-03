import React from 'react'
import { ResumeTable } from '@/components'
import { Box } from '@material-ui/core'

const Technology = () => {
  return (
    <Box sx={{ width: '90%', margin: '30px auto 0' }}>
      <ResumeTable title="Job History" />
    </Box>
  )
}

export default Technology
