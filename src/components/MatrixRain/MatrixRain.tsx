import React, { useState } from 'react'
import { getRandomInt } from '@/data/utils'
import useInterval from '@use-it/interval'
import { createTheme } from "@material-ui/core"
import { ThemeProvider } from '@/components'

const validChar = 'abcdefghijklmnopqrstuvwxyz0123456789$+-*/=モジレツリアクトジャバスクリプトサイバーパンクネオトウキョウサイバーブレードランナーコウカクキドウタイマトリックストロンアキラゴーストインザシェル'
const streamOdds = 0.02

const minStreamChar = 15
const maxStreamChar = 70

const getRandomChar = () => validChar.charAt(Math.floor(Math.random() * validChar.length))

const getRandomStream = () =>
  new Array(getRandomInt(minStreamChar, maxStreamChar)).fill(undefined).map(_ => getRandomChar())

const getMutatedStream = (stream: string[]) => {
  const newStream = []
  for (let i = 1; i < stream.length; i++) {
    if (Math.random() < streamOdds) {
      newStream.push(getRandomChar())
    }
    newStream.push(stream[i])
  }
  newStream.push(getRandomChar())
  return newStream
}

const hachiMaruPopFont = createTheme({
  typography: {
    fontFamily: [
      'Hachi Maru Pop',
    ].join(','),
  },
  palette: {
    type: 'dark',
  }
})

const MatrixRain: React.FC = () => {
  const [stream, setStream] = useState(getRandomStream())
  const [marginTop, setMarginTop] = useState(stream.length * -50)

  useInterval(() => {
    if (marginTop > window.innerHeight) {
      setMarginTop(0)
    }
    setMarginTop(marginTop + 70)
    setStream(stream => getMutatedStream(stream))
  }, 100)

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap" rel="stylesheet" />
      <ThemeProvider theme={hachiMaruPopFont}>
        <div
          style={{
            marginTop: marginTop,
            color: '#00F8F8',
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            textShadow: '0px 0px 8px rgba(32, 194, 14, 0.8)',
            fontSize: 15
        }}>
          {stream.map((char, index) => (
            <a
              key={index}
              style={{
                color: index === stream.length - 1 ? '#00F8F8' : undefined,
                opacity: index < getRandomInt(10, 30) ? 0.1 + 0.15 : 1,
                textShadow: index === stream.length - 1 ? '0px 0px 20px rgba(255, 255, 255, 1)' : undefined
              }}
            >
              {char}
            </a>
          )) }
        </div>

      </ThemeProvider>

    </>
  )
}

export default MatrixRain
