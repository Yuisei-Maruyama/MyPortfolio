import { useState, useCallback } from 'react'

const useFlipped = () => {
  const [isFlipped, setFlipped] = useState<boolean>(false)

  const handleSetFlipped = useCallback(
    (isFlipped: boolean) => {
      setFlipped(isFlipped)
    },
    [setFlipped]
  )

  return {
    isFlipped,
    handleSetFlipped,
  }
}

export default useFlipped
