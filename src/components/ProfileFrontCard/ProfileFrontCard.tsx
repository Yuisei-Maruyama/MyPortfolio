import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import { rgba } from 'polished'
import classes from './ProfileFrontCard.module.scss'

type Props = {
  width?: string
  height?: string
  imageSrc?: string
}

const ProfileFrontCard: React.FC<Props> = (props: Props) => {
  const { width, height, imageSrc } = props

  return (
    <>
      <Card
        style={{
          width: width,
          height: height,
          backgroundColor: rgba(0, 0, 0, 0.3),
          color: '#06D8D7',
          border: '1px solid #06D8D7',
          borderRadius: '15px',
        }}
      >
        <CardMedia style={{ borderRadius: '15px', width: '100%', height: '280px' }} component="img" image={imageSrc} />
        <CardContent>
          <Typography gutterBottom style={{ fontSize: '30px' }} component="div" className={classes.neonText}>
            Yuisei Maruyama
          </Typography>
          <Typography variant="body1">Job: Front-End Engineer</Typography>
          <Typography component={'div'} variant="body1">
            Location: Tokyo/Japan
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default ProfileFrontCard
