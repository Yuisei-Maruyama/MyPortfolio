import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { ModeSwitch, ThemeProvider, Menu } from '@/components'
import { AiFillGithub, AiFillInstagram } from 'react-icons/ai'
import { SiNetlify } from 'react-icons/si'
import { BiTask } from 'react-icons/bi'
import { useHistory, withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    grow: {
      flexGrow: 1,
    },
  })
)

const Header2: React.FC = () => {
  const classes = useStyles()
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)

  const changeToggle = (toggle: boolean) => setToggle(!toggle)

  const history = useHistory()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Menu toggle={toggle} changeToggle={() => changeToggle(toggle)} />
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              setToggle(!toggle)
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              history.push('/')
            }}
          >
            MyPortfolio
          </Typography>
          <Typography>Components</Typography>
          <Typography variant="h6" style={{ marginLeft: 10}} className={classes.grow}>Documents</Typography>
          <Tooltip title="TaskBoard" arrow>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="github tasks"
              onClick={() => {
                history.push('/board')
              }}
            >
              <BiTask />
            </IconButton>
          </Tooltip>
          <Tooltip title="GitHub Repo" arrow>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="github"
              onClick={() => {
                window.open('https://github.com/Yuisei-Maruyama/MyPortfolio', '_blank')
              }}
            >
              <AiFillGithub />
            </IconButton>
          </Tooltip>
          <Tooltip title="Netlify" arrow>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="github tasks"
              onClick={() => {
                window.open('https://app.netlify.com/sites/silly-goodall-7bfc72/deploys?filter=main', '_blank')
              }}
            >
              <SiNetlify />
            </IconButton>
          </Tooltip>
          <Tooltip title="Instagram" arrow>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="instagram"
              onClick={() => {
                window.open('https://www.instagram.com/y_metro/', '_blank')
              }}
            >
              <AiFillInstagram />
            </IconButton>
          </Tooltip>
          <ModeSwitch darkMode={darkMode} setDarkMode={setDarkMode}></ModeSwitch>
          <ThemeProvider mode={darkMode} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(Header2)
