import React, { memo } from 'react'
import { Card, CardContent, Typography, List } from '@mui/material'
import { FaVuejs, FaSass, FaNode } from 'react-icons/fa'
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiWebpack,
  SiReact,
  SiMaterialUi,
  SiVuetify,
} from 'react-icons/si'
import { DiMarkdown, DiIllustrator, DiPhotoshop } from 'react-icons/di'
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

const $IconList = styled(List)`
  display: grid;
  text-align: center;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 50px 50px;
  row-gap: 13.5px;
  color: #06d8d7;
`

const ProfileBackCard: React.FC<Props> = (props: Props) => {
  const { width, height } = props

  return (
    <$neonBorderCard width={width} height={height}>
      <CardContent sx={{ padding: '30px' }}>
        <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h4" component="div">
          Skill
        </Typography>
        <$IconList dense={true}>
          <SiHtml5 size={55} />
          <SiCss3 size={55} />
          <FaSass size={55} />
          <SiJavascript size={55} />
          <SiTypescript size={55} />
          <SiWebpack size={55} />
          <FaVuejs style={{ marginTop: 10 }} size={55} />
          <SiReact size={55} />
          <FaNode size={55} />
          <DiMarkdown size={55} />
          <SiMaterialUi size={55} />
          <SiVuetify size={55} />
          <DiIllustrator size={55} />
          <DiPhotoshop size={55} />
        </$IconList>
      </CardContent>
    </$neonBorderCard>
  )
}

export default memo(ProfileBackCard)
