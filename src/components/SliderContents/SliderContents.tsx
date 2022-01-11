import React from 'react'
import { Chip, Avatar, Typography } from '@mui/material'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { rgba } from 'polished'
import classes from './SliderContents.module.scss'
import { Issue } from '@/types'

type Props = {
  item: unknown,
  specify?: string
}

const SliderContent: React.FC<Props> = (props: Props) => {

  const { item, specify } = props

  return (
    <>
      {
        specify === 'github-todo'
          ?
            (
              <>
                <Chip
                  label={(item as Issue).user.login}
                  style={{ color: 'white', backgroundColor: rgba(0, 0, 0, 0.3), cursor: 'pointer' }}
                  onClick={() => window.open(`https://github.com/Yuisei-Maruyama`, '_blank')}
                  avatar={<Avatar alt={(item as Issue).user.login} src={(item as Issue).user.avatar_url} />}
                />
                <div className={classes.contents}>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 'bold', color: 'white', cursor: 'pointer' }}
                    onClick={() => window.open(`${(item as Issue).html_url}`, '_blank')}
                  >
                    {(item as Issue).title}
                  </Typography>
                  <hr className={classes.divider} />
                  <Typography sx={{ fontSize: 5 }} component="div">
                    <MarkdownPreview source={(item as Issue).body} style={{ fontSize: 11, fontWeight: 'bold' }} />
                  </Typography>
                </div>
              </>
            )
          : <></>
        }
    </>
  )
}

export default SliderContent
