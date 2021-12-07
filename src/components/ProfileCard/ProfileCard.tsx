import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'

const ProfileCard: React.FC = () => {
  return (
    <Card style={{ maxWidth: 400 }}>
      <CardMedia component="img" image="assets/Profile.jpg" title="Contemplative Reptile" />
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
        <Typography component={'div'} variant="body2" color="textSecondary">
          Technologies:
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
