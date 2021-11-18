import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { Box, Button } from '@material-ui/core'
import classes from './Circular.module.scss'

type Props = {
  length: number
  value: number
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
  const [selected, setSelect] = useState<number>(props.value)
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button onClick={() => { prev(selected, props.length, setSelect) } }><MdChevronLeft /></Button>
      <Box sx={{ width: '750px' }} className={classes.stage}>
        <Box sx={{ display: 'flex', height: '250px' }} style={{ transform: `translateZ(-650px) rotateY(${(360 / props.length) * selected}deg)` }} className={classes.circle}>
          {
            [1, 2, 3, 4, 5, 6].map((position) => {
              return (
                <div key={position - 1} style={{ transform: `translateX(-50%) rotateY(${(360 / props.length) * (position - 1)}deg) translateZ(550px)` }} className={classes.item}>
                  { position }
                  {props.value}
                </div>
              )
            })
          }
        </Box>
      </Box>
      <Button onClick={() => { next(selected, props.length, setSelect) }} ><MdChevronRight /></Button>
    </Box>
  )
}

export default Circular
