import React, { memo } from 'react'
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material'
import { FaVuejs } from 'react-icons/fa'
import { SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact } from 'react-icons/si'
import { styled } from '@mui/system'

type Props = {
  width?: string
  height?: string
}

interface CardSize {
  width?: string
  height?: string
}

const $neonBorderCard = styled(Card)<CardSize>`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: 1px solid #06d8d7;
  border-radius: 15px;
  box-shadow: -1px -1px #06d8d7, 1px -1px #06d8d7, 1px 1px #06d8d7, -1px 1px #06d8d7, 0 0 0.1em #06d8d7,
    0 0 0.1em #06d8d7 inset, 0 0 0.5em #06d8d7, 0 0 0.5em #06d8d7 inset, 0 0 1em #06d8d7, 0 0 1em #06d8d7 inset;
`

const ProfileBackCard: React.FC<Props> = (props: Props) => {
  const { width, height } = props

  return (
    <$neonBorderCard width={width} height={height}>
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
    </$neonBorderCard>
  )
}

export default memo(ProfileBackCard)
