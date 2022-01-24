import React from 'react'
import { CssBaseline, createTheme, Theme } from '@material-ui/core'
import { ThemeProvider as BaseThemeProvider } from '@material-ui/styles'

type Props = {
  theme?: Theme
  mode?: 'dark' | 'light'
  children?: React.ReactNode
}

const ThemeProvider: React.FC<Props> = (props: Props) => {

  const { theme, children, mode } = props

  const baseTheme = createTheme({
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
    <BaseThemeProvider theme={theme || baseTheme}>
      <CssBaseline />
      { children }
    </BaseThemeProvider>
  )
}

export default ThemeProvider
