import React from 'react'
import { CssBaseline, createTheme } from '@material-ui/core'
import { ThemeProvider as BaseThemeProvider } from '@material-ui/styles'

type Props = {
  mode?: 'dark' | 'light'
  children?: React.ReactNode
}

const ThemeProvider: React.FC<Props> = (props: Props) => {

  const { children, mode } = props

  const theme = createTheme({
    palette: {
      type: mode ? 'dark' : 'light',
      cyber: {
        main: '#001A1A',
        sub: '#021114',
        text: '#00F8F8',
        subText: '#00FF00'
      }
    },
  })
  return (
    <BaseThemeProvider theme={theme}>
      <CssBaseline />
      { children }
    </BaseThemeProvider>
  )
}

export default ThemeProvider
