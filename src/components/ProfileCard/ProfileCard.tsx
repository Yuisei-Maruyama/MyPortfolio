import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const ProfileCard: React.FC = () => {
  return (
    <Card style={{ maxWidth: 400 }}>
      <CardMedia component="img" image="assets/Profile.jpg" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Yuisei Maruyama
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Age: 24
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Job: Front-End Engineer
        </Typography>
        <Typography component={'div'} variant="body2" color="textSecondary">
          Location: Tokyo/Japan
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
