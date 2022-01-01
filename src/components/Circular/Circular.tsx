import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { Box, Button } from '@material-ui/core'
import { Chip, Avatar, Typography } from '@mui/material'
import classes from './Circular.module.scss'
import { Issue, Issues } from '@/types'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { rgba } from 'polished'

type Props = {
  length: number
  value: number
  todoItems: Issues
}

const prev = (selected: number, length: number, setSelect: Function) => {
  selected = selected > 0 ? selected - 1 : length - 1
  setSelect(selected)
}

const next = (selected: number, length: number, setSelect: Function) => {
  selected = selected < length - 1 ? selected + 1 : 0
  setSelect(selected)
}

const Circular: React.FC<Props> = (props: Props) => {
  const { todoItems, value, length } = props

  const [selected, setSelect] = useState<number>(value)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        className={classes.button}
        style={{ color: 'white' }}
        onClick={() => {
          prev(selected, length, setSelect)
        }}
      >
        <MdChevronLeft />
      </Button>
      <Box sx={{ width: '1200px' }} className={classes.stage}>
        <Box
          sx={{ display: 'flex', height: '350px' }}
          style={{ transform: `translateZ(-550px) rotateY(${(360 / length) * selected}deg)` }}
          className={classes.circle}
        >
          {todoItems.map((item: Issue, position: number) => {
            return (
              <div
                key={position - 1}
                style={{
                  transform: `translateX(-50%) rotateY(${(360 / length) * (position - 1)}deg) translateZ(730px)`,
                }}
                className={classes.item}
              >
                <Chip
                  label={item.user.login}
                  className={classes.chip}
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
                    <MarkdownPreview source={item.body} style={{ fontSize: 10, fontWeight: 'bold' }} />
                  </Typography>
                </div>
              </div>
            )
          })}
        </Box>
      </Box>
      <Button
        className={classes.button}
        style={{ color: 'white' }}
        onClick={() => {
          next(selected, props.length, setSelect)
        }}
      >
        <MdChevronRight />
      </Button>
    </Box>
  )
}

export default Circular
