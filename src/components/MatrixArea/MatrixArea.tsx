import React from 'react'
import { MatrixRain } from '@/components'

type Props = {
  width?: number
  height?: number
}

const MatrixArea: React.FC<Props> = (props: Props) => {
  const { width, height } = props
  const streamCount = Math.floor(window.innerWidth / 26)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'fixed',
        top: '10%',
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'ignore',
        width: width,
        height: height,
      }}
    >
      ちょっと待つとここに文字が流れます！
      {new Array(streamCount).fill(undefined).map((_, index) => (
        <MatrixRain key={index} />
      ))}
    </div>
  )
}

export default MatrixArea
