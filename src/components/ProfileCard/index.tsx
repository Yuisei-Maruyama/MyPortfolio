import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@material-ui/core'
import { Tooltip } from '@/components'
// import Tooltip from '../Tooltip'

const ProfileCard = () => {
  return (
    <Card style={{ maxWidth: 300}}>
      <CardMedia
        component="img"
        image="assets/Profile.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Yuisei Maruyama
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Age: 24
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Job: FrontEndEngineer
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Technologies:
          <Box display='flex'>
            <Tooltip icon='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg' title='html' btnName='HTML' />
            <Tooltip icon='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg' title='css' btnName='CSS' />
            <Tooltip icon='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' title='vue' btnName='Vue' />
            <Tooltip icon='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' title='react' btnName='React' />
          </Box>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
