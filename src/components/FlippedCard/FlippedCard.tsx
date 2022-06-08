import React, { memo } from 'react'
import styled from 'styled-components'

type Props = {
  children?: React.ReactNodeArray
  flipDirection?: 'horizontal' | 'vertical'
  isFlipped: boolean
  setFlipped: (isFlipped: boolean) => void
}

const _FlippedCard = styled.div`
  perspective: 500px;
  transform-style: preserve-3d;
  transition: 1.25s ease;
  &:hover {
    transform: rotateY(180deg);
  }
`

const _scaleX = styled.div`
  transform: scaleX(-1);
`

const FlippedCard: React.FC<Props> = (props: Props) => {
  const { children, isFlipped, setFlipped } = props

  const handleHover = () => {
    setFlipped(!isFlipped)
  }

  return (
    <>
      {Array.isArray(children) && children?.length === 2 ? (
        <_FlippedCard>
          {!isFlipped ? (
            <div onMouseEnter={handleHover}>{children[0]}</div>
          ) : (
            <_scaleX onMouseLeave={handleHover}>{children[1]}</_scaleX>
          )}
        </_FlippedCard>
      ) : (
        <p>FlippedCard need two elements!!</p>
      )}
    </>
  )
}

export default memo(FlippedCard)
