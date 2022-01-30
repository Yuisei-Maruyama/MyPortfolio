import React, { useState, useEffect } from 'react'

type Props = {
  children?: React.ReactNodeArray
  flipDirection?: 'horizontal' | 'vertical'
  infinite: boolean
  isFlipped: boolean
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>
  setInfinite: React.Dispatch<React.SetStateAction<boolean>>
}

const FlippedCard: React.FC<Props> = (props: Props) => {

  const { children, isFlipped, infinite, setFlipped } = props

  const [rotation, setRotation] = useState(0)

  const frontRotateX = `rotateX(${
    infinite ? rotation : isFlipped ? 180 : 0
    }deg)`;
  const backRotateX = `rotateX(${
    infinite ? rotation + 180 : isFlipped ? 0 : -180
    }deg)`;

  console.log(frontRotateX)
  console.log(backRotateX)

  console.log(children)

  const handleHover = () => {
    setFlipped(!isFlipped)
  }

  useEffect(() => {
    if (isFlipped) {
      setRotation((c) => c + 180);
    }
  }, [isFlipped])

  return (
    <>
      {
        Array.isArray(children) && children?.length === 2
          ? (
            <>
              { !isFlipped ? <div onMouseEnter={handleHover}>{ children[0] }</div> : <div onMouseLeave={handleHover}>{ children[1] }</div>  }
            </>
          )
          : <p>FlippedCard need two elements!!</p>
      }
    </>
  )
}

export default FlippedCard
