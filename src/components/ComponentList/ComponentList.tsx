import React from 'react'
import { useHistory } from 'react-router-dom'
import TreeItem from '@mui/lab/TreeItem'

type Props = {
  getParams: (params: string) => void
}

const ComponentList: React.FC<Props> = (props: Props) => {

  const history = useHistory()

  const { getParams } = props

  const handleToComponent = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!getParams) return
    const param = (event.target as unknown as { textContent: string }).textContent
    getParams(param)
    history.push(`/components/${param}`)
  }

  const previewComponent = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    handleToComponent(event)
  }


  return (
    <>
      <TreeItem nodeId="2" label="Header" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewComponent(e)} />
      <TreeItem nodeId="3" label="Circular" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewComponent(e)}></TreeItem>
      <TreeItem nodeId="100" label="Footer" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewComponent(e)} />
    </>
  )
}

export default ComponentList
