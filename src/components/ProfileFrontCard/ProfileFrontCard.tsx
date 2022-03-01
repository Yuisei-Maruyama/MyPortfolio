import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import { rgba } from 'polished'

type Props = {
  height?: string
}

const ProfileFrontCard: React.FC<Props> = (props: Props) => {
  const { height } = props

  return (
    <>
      <Card style={{ maxWidth: '100%', height: height, backgroundColor: rgba(0, 0, 0, 0.3), color: 'white' }}>
        <CardMedia component="img" image="assets/Profile.jpg" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Yuisei Maruyama
          </Typography>
          <Typography variant="body2">Job: Front-End Engineer</Typography>
          <Typography component={'div'} variant="body2">
            Location: Tokyo/Japan
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default ProfileFrontCard
