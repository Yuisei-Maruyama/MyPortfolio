import React from 'react'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'

const MaterialUISwitch = styled(Switch)(({ checked, checkedcolor, uncheckcolor }: { checked: boolean, checkedcolor: string, uncheckcolor: string }) => ({
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
        backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M20.37, 8.91L19.37, 10.64L7.24, 3.64L8.24, 1.91L11.28, 3.66L12.64, 3.29L16.97, 5.79L17.34, 7.16L20.37, 8.91M6, 19V7H11.07L18, 11V19A2, 2 0 0, 1 16, 21H8A2, 2 0 0, 1 6, 19Z" /></svg>')`,
        // )}" d=${checkedSvg} /></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: checked ? '#8796A5' : '#aab4be',
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
      backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          '#fff',
      )}" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>')`,
      // )}" d=${unCheckedSvg} /></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: checked ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

// type Props = {
//   checked: boolean
//   color: {
//     checkedcolor: string
//     uncheckcolor: string
//   },
//   svg: {
//     checkedSvg: string
//     unCheckedSvg: string
//   }
//   onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
// }

type Props = {
  checked: boolean
  color: {
    checkedcolor: string
    uncheckcolor: string
  },
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const IconSwitch: React.FC<Props> = (props: Props) => {


  const { checked, onClick, color } = props
  // const { checked, onClick, color, svg } = props
  const { checkedcolor, uncheckcolor } = color
  // const { checkedSvg, unCheckedSvg } = svg
  return (
    <>
      <MaterialUISwitch
        sx={{ m: 1 }}
        // defaultChecked={checked}
        checked={checked}
        checkedcolor={checkedcolor}
        uncheckcolor={uncheckcolor}
        // checkedSvg={checkedSvg}
        // unCheckedSvg={unCheckedSvg}
        onClick={onClick}
      />
    </>
  )
}

export default IconSwitch
