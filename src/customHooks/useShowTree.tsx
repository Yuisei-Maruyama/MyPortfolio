import React from 'react'
import { useHistory } from 'react-router-dom'

const useShowTree = (getParams: (params: string) => void) => {
  const history = useHistory()
  const handleShowItem = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!getParams) return
    const param = (event.target as unknown as { textContent: string }).textContent
    getParams(param)
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
