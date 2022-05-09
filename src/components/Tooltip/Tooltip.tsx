import React from 'react'
import { Button, Tooltip as TooltipUI } from '@material-ui/core'

type Props = Record<string, string>

const Tooltip: React.FC<Props> = (props: Props) => {
  return (
    <TooltipUI title={props.title}>
      <Button>{props.children}</Button>
    </TooltipUI>
  )
}

export default Tooltip
