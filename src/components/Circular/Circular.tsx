import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { Box, Button } from '@material-ui/core'
import classes from './Circular.module.scss'
import { SliderContents } from '@/components'

type Props = {
  length: number
  value: number
  items: unknown[]
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
  const { items, value, length } = props

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
          {items.map((item: unknown, position: number) => {
            return (
              <div
                key={position - 1}
                style={{
                  transform: `translateX(-50%) rotateY(${(360 / length) * (position - 1)}deg) translateZ(760px)`,
                }}
                className={classes.item}
              >
                <SliderContents item={item} specify='github-todo' />
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
