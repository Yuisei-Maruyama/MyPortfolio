import React, { useState } from 'react'

const useDelete = () => {
  const [toggleDelete, setDelete] = useState<boolean>(false)

  const handleClickToggle = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setDelete((event.target as unknown as { checked: boolean }).checked)
  }

  return {
    toggleDelete,
    handleClickToggle,
  }
}

export default useDelete
