import React from 'react'
import { CssBaseline, createTheme } from '@material-ui/core'
import { ThemeProvider as BaseThemeProvider } from '@material-ui/styles'

type Props = {
  mode: boolean
}

const ThemeProvider: React.FC<Props> = (props: Props) => {
  const theme = createTheme({
    palette: {
      type: props.mode ? 'dark' : 'light',
    },
  })
  return (
    <BaseThemeProvider theme={theme}>
      <CssBaseline />
    </BaseThemeProvider>
  )
}

export default ThemeProvider
