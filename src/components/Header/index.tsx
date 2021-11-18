import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { ModeSwitch, ThemeProvider, Menu } from '@/components'
import { AiFillGithub, AiFillInstagram } from "react-icons/ai"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

const Header: React.FC = () => {
  const classes = useStyles()
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)

  const changeToggle = (toggle: boolean) => setToggle(!toggle)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Menu toggle={ toggle } changeToggle={() => changeToggle(toggle)} />
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => { setToggle(!toggle) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MyPortfolio
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="github" onClick={() => { window.open('https://github.com/Yuisei-Maruyama/MyPortfolio', '_blank') }}><AiFillGithub /></IconButton>
          <IconButton edge="start" color="inherit" aria-label="instagram" onClick={() => { window.open('https://www.instagram.com/y_metro/', '_blank') }}><AiFillInstagram /></IconButton>
          <ModeSwitch darkMode={darkMode} setDarkMode={setDarkMode}></ModeSwitch>
          <ThemeProvider mode={darkMode} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
