import React from 'react'
import { createTheme, Theme, ThemeProvider as BaseThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

type Props = {
  theme?: Theme
  mode?: 'dark' | 'light'
  children?: React.ReactNode
}

// declare module '@mui/material/styles' {
//   interface Theme {
//     palette: {
//       mode: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   // interface ThemeOptions {
//   //   palette?: {
//   //     mode: 'light' | 'dark'
//   //   }
//   // }
// }

const ThemeProvider: React.FC<Props> = (props: Props) => {
  const { children, mode } = props

  const baseTheme: Theme = createTheme({
    palette: {
      mode: mode === 'dark' ? 'dark' : 'light',
    },
  })
  return (
    <BaseThemeProvider theme={baseTheme}>
      <CssBaseline />
      {children}
    </BaseThemeProvider>
  )
}

export default ThemeProvider
