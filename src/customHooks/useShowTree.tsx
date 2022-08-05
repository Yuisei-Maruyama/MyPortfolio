import React from 'react'
import { useHistory } from 'react-router-dom'

const useShowTree = () => {
  const history = useHistory()
  const handleShowItem = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const param = (event.target as unknown as { textContent: string }).textContent
    history.push(`/documents/${param}`)
  }

  const previewTree = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    handleShowItem(event)
  }

  return {
    previewTree,
  }
}

export default useShowTree
