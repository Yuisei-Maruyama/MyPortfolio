import React from 'react'
import { MatrixRain } from '@/components'
import styled from 'styled-components'

type Props = {
  width?: number
  height?: number
}

const MatrixArea: React.FC<Props> = (props: Props) => {
  const { width, height } = props
  const streamCount = Math.floor(window.innerWidth / 26)

  return (
    <_MatrixWrapper width={width} height={height}>
      {new Array(streamCount).fill(undefined).map((_, index) => (
        <MatrixRain key={index} />
      ))}
    </_MatrixWrapper>
  )
}

const _MatrixWrapper = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  top: 10%;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: ignore;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  z-index: 1000;
`

export default MatrixArea
