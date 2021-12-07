import React from 'react'
import { Button, Tooltip as TooltipUI } from '@material-ui/core'
import classes from './Tooltip.module.scss'

type Props = Record<string, string>

const Tooltip: React.FC<Props> = (props: Props) => {
  return (
    <TooltipUI title={props.title}>
      <Button>
        <img src={props.icon} alt={props.title} className={classes.tooltip_icon} />
        {props.btnName}
      </Button>
    </TooltipUI>
  )
}

export default Tooltip
