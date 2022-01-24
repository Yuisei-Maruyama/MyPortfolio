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
    <div style={{
      display: 'flex',
      width: width,
      height: height
    }}>
      {new Array(streamCount).fill(undefined).map((_, index) => (
        <MatrixRain key={index} />
      ))}
    </div>
  )
};

export default MatrixArea
