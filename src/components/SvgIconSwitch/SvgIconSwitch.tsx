import React from 'react'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'

const MaterialUISwitch = styled(Switch)(({ checked, checkedcolor, uncheckcolor, checkedsvg, unchecksvg }: { checked: boolean, checkedcolor: string, uncheckcolor: string, checkedsvg: string, unchecksvg: string }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" version="1.1" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="${checkedsvg}" /></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: checked ? '#FFFFFF' : '#FFFFFF',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor:  checked ? checkedcolor : uncheckcolor,
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" version="1.1" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          '#fff',
      )}" d="${unchecksvg}" /></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: checked ? '#FFFFFF' : '#FFFFFF',
    borderRadius: 20 / 2,
  },
}));

type Props = {
  checked: boolean
  color: {
    checkedcolor: string
    uncheckcolor: string
  },
  svg: {
    checkedsvg: string
    unchecksvg: string
  },
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const IconSwitch: React.FC<Props> = (props: Props) => {

  const { checked, onClick, color, svg } = props
  const { checkedcolor, uncheckcolor } = color
  const { checkedsvg, unchecksvg } = svg
  return (
    <>
      <MaterialUISwitch
        sx={{ m: 3 }}
        checked={checked}
        checkedcolor={checkedcolor}
        uncheckcolor={uncheckcolor}
        checkedsvg={checkedsvg}
        unchecksvg={unchecksvg}
        onClick={onClick}
      />
    </>
  )
}

export default IconSwitch
