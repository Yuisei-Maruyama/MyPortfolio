import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu as DefaultMenu,
  Avatar,
  Button,
  Tooltip,
  MenuItem
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AiFillGithub, AiFillInstagram } from 'react-icons/ai'
import { SiNetlify } from 'react-icons/si'
import { BiTask } from 'react-icons/bi'
import { useHistory, withRouter } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { rgba } from 'polished'
import { ThemeProvider } from '@/components'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiButton-root.MuiButton-text.MuiButton-textPrimary': { color: rgba(0, 248,248, 1) }
    },
  })
)

const pages = ['Components', 'Documents']
const settings = ['Login', 'Account']


const Header2: React.FC = () => {

  const classes = useStyles()

  const history = useHistory()

  // const [darkMode, setDarkMode] = useState<boolean>(false)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleToPage = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const param = (event.target as unknown as { textContent: string }).textContent
    const convertParam = param.slice(0, 1).toLocaleLowerCase() + param.slice(1)
    history.push(`/${convertParam}`)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  return (
    <AppBar position="static">
        <Toolbar disableGutters sx={{ paddingLeft: 3, paddingRight: 1, backgroundColor: rgba(0,26,26, 1), border: "solid 1px #06D8D7" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              history.push('/')
            }}
          >
            MyPortfolio
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <DefaultMenu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* Display: SM, Tablet */}
              {pages.map((page) => (
                <MenuItem key={page} onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => handleToPage(e)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </DefaultMenu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              history.push('/')
            }}
          >
            My Portfolio
          </Typography>
          {/* Display: PC */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => handleToPage(e)}
                sx={{ my: 2, color: 'white', display: 'block' }}
                className={classes.root}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
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
                sx={{ marginLeft: 0.1 }}
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
                sx={{ marginLeft: 0.1 }}
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
                sx={{ marginLeft: 0.1 }}
                onClick={() => {
                  window.open('https://www.instagram.com/y_metro/', '_blank')
                }}
              >
                <AiFillInstagram />
              </IconButton>
            </Tooltip>
            {/* <ModeSwitch darkMode={darkMode} setDarkMode={setDarkMode}></ModeSwitch> */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar sx={{ width: 35, height: 35}} alt="Yuisei Maruyama" />
              </IconButton>
            </Tooltip>
            <DefaultMenu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </DefaultMenu>
        </Box>
        <ThemeProvider mode={true} />
        </Toolbar>
    </AppBar>
  )
}

export default withRouter(Header2)
