import React, { memo } from 'react'
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material'
import { rgba } from 'polished'
import { FaVuejs } from 'react-icons/fa'
import { SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact } from 'react-icons/si'

type Props = {
  width?: string
  height?: string
}

const ProfileBackCard: React.FC<Props> = (props: Props) => {
  const { width, height } = props

  return (
    <Card
      style={{
        width: width,
        height: height,
        backgroundColor: rgba(0, 0, 0, 0.3),
        color: 'white',
        border: '1px solid #06D8D7',
        borderRadius: '15px',
      }}
    >
      <CardContent>
        <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h4" component="div">
          Skill
        </Typography>
        <List sx={{ overflow: 'auto' }} dense={true}>
          <ListItem>
            <SiHtml5 />
            <ListItemText>HTML</ListItemText>
          </ListItem>
          <ListItem>
            <SiCss3 />
            <ListItemText>CSS</ListItemText>
          </ListItem>
          <ListItem>
            <SiJavascript />
            <ListItemText>JavaScript</ListItemText>
          </ListItem>
          <ListItem>
            <SiTypescript />
            <ListItemText>TypeScript</ListItemText>
          </ListItem>
          <ListItem>
            <FaVuejs />
            <ListItemText>Vue.js</ListItemText>
          </ListItem>
          <ListItem>
            <SiReact />
            <ListItemText>React.js</ListItemText>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

export default memo(ProfileBackCard)
