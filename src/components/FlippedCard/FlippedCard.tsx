import React, { useState, memo } from 'react'

type Props = {
  children?: React.ReactNodeArray
  flipDirection?: 'horizontal' | 'vertical'
  isFlipped: boolean
  setFlipped: (isFlipped: boolean) => void
}

const FlippedCard: React.FC<Props> = (props: Props) => {

  const { children, isFlipped, setFlipped } = props

  const [rotation, setRotation] = useState(0)

  const handleHover = () => {
    if (isFlipped) {
      setRotation((c) => c + 180)
    }
    setRotation((c) => c - 180)
    setFlipped(!isFlipped)
  }

  return (
    <>
      {
        Array.isArray(children) && children?.length === 2
          ? (
            <>
              {
                !isFlipped
                  ? <div style={{ transform: `rotateY(${rotation})`}} onMouseEnter={handleHover}>{ children[0] }</div>
                  : <div style={{ transform: `rotateY(${rotation})`}} onMouseLeave={handleHover}>{ children[1] }</div>
              }
            </>
          )
          : <p>FlippedCard need two elements!!</p>
      }
    </>
  )
}

export default memo(FlippedCard)
