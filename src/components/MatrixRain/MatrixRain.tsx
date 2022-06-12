import React, { useState } from 'react'
import { getRandomInt } from '@/data/utils'
import useInterval from '@use-it/interval'
import styled from 'styled-components'

// type MatrixRainWrapper = {
//   marginTop: number | string
// }

type MatrixRainChars = {
  stream: string[]
  index: number
  getRandomInt: (min: number, max: number) => number
}

const validChar =
  'abcdefghijklmnopqrstuvwxyz0123456789$+-*/=モジレツリアクトジャバスクリプトサイバーパンクネオトウキョウサイバーブレードランナーコウカクキドウタイマトリックストロンアキラゴーストインザシェル'
const streamOdds = 0.02

const minStreamChar = 15
const maxStreamChar = 70

const getRandomChar = () => validChar.charAt(Math.floor(Math.random() * validChar.length))

const getRandomStream = () =>
  new Array(getRandomInt(minStreamChar, maxStreamChar)).fill(undefined).map((_) => getRandomChar())

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

const MatrixRain: React.FC = () => {
  const [stream, setStream] = useState(getRandomStream())
  const [marginTop, setMarginTop] = useState(stream.length * -50)

  useInterval(() => {
    if (marginTop > window.innerHeight) {
      setMarginTop(0)
    }
    setMarginTop(marginTop + 70)
    setStream((stream) => getMutatedStream(stream))
  }, 100)

  return (
    <>
        <div
          style={{
            marginTop: marginTop,
            color: '#00F8F8',
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            textShadow: '0px 0px 8px rgba(32, 194, 14, 0.8)',
            fontSize: 15,
          }}
        >
          {stream.map((char, index) => (
            <_MatrixRainChars
              key={index}
              index={index}
              stream={stream}
              getRandomInt={() => getRandomInt(10, 30)}
            >
              {char}
            </_MatrixRainChars>
          ))}
        </div>
    </>
  )
}

// const _MatrixRainWrapper = styled.div<MatrixRainWrapper>`
//   margin-top: ${({marginTop}) => marginTop};
//   color: #00F8F8;
//   writing-mode: vertical-rl;
//   text-orientation: upright;
//   user-select: none;
//   white-space: nowrap;
//   text-shadow: 0px 0px 8px rgba(32, 194, 14, 0.8);
//   font-size: 15;
//   font-family: 'HachiMaruPopFont';
// `

const _MatrixRainChars = styled.a<MatrixRainChars>`
  color: ${({stream, index}) => (index === stream.length - 1) ? '#00F8F8' : undefined};
  opacity: ${({getRandomInt, index}) => (index < getRandomInt(10, 30)) ? 0.1 + 0.15 : 1};
  text-shadow: ${({stream, index}) => (index === stream.length - 1) ? '0px 0px 20px rgba(255, 255, 255, 1)' : undefined};
`

export default MatrixRain
