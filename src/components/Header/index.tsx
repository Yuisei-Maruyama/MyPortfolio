import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { ModeSwitch, ThemeProvider } from '@/components'

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MyPortfolio
          </Typography>
          <ModeSwitch darkMode={darkMode} setDarkMode={setDarkMode}></ModeSwitch>
          <ThemeProvider mode={darkMode} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
