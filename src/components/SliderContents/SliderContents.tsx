import React from 'react'
import { Chip, Avatar, Typography } from '@mui/material'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { rgba } from 'polished'
import classes from './SliderContents.module.scss'
import { Issue } from '@/types'

type Props = {
  item: Issue
}

const SliderContent: React.FC<Props> = (props: Props) => {

  const { item } = props

  return (
    <>
      <Chip
        label={item.user.login}
        style={{ color: 'white', backgroundColor: rgba(0, 0, 0, 0.3), cursor: 'pointer' }}
        onClick={() => window.open(`https://github.com/Yuisei-Maruyama`, '_blank')}
        avatar={<Avatar alt={item.user.login} src={item.user.avatar_url} />}
      />
      <div className={classes.contents}>
        <Typography
          sx={{ fontSize: 13, fontWeight: 'bold', color: 'white', cursor: 'pointer' }}
          onClick={() => window.open(`${item.html_url}`, '_blank')}
        >
          {item.title}
        </Typography>
        <hr className={classes.divider} />
        <Typography sx={{ fontSize: 5 }} component="div">
          <MarkdownPreview source={item.body} style={{ fontSize: 11, fontWeight: 'bold' }} />
        </Typography>
      </div>
    </>
  )
}

export default SliderContent
