import React from 'react'
import { Drawer } from '@material-ui/core'
import { MenuList, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { FaPlane, FaRegAddressCard } from 'react-icons/fa'
import { AiTwotoneHome, AiOutlineBgColors } from 'react-icons/ai'
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom'
import { TreeViewer } from '@/components'

interface Props extends RouteComponentProps {
  toggle: boolean
  changeToggle: (toggle: boolean) => void
}

interface Nav {
  text: string
  icon: any
  nav: string
}

const Menu: React.FC<Props> = (props: Props) => {
  const history = useHistory()

  const itemList: Nav[] = [
    { text: 'Home', icon: <AiTwotoneHome />, nav: '' },
    { text: 'Job History', icon: <FaRegAddressCard />, nav: 'history' },
    { text: 'Art', icon: <AiOutlineBgColors />, nav: 'art' },
    { text: 'Travel', icon: <FaPlane />, nav: 'travel' },
  ]

  const handleDrawerToggle = (toggle: boolean) => {
    props.changeToggle(!toggle) // Drawer の開閉状態を反転
  }

  const handleToPage = (item: { nav: string }, toggle: boolean) => {
    history.push(`/${item.nav}`)
    handleDrawerToggle(toggle)
  }

  return (
    <Drawer open={props.toggle} onClose={() => handleDrawerToggle(props.toggle)}>
      <MenuList>
        {itemList.map((item, index) => (
          <MenuItem key={index} onClick={() => handleToPage(item, props.toggle)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
        <Divider />
        <TreeViewer />
      </MenuList>
    </Drawer>
  )
}

export default withRouter(Menu)
