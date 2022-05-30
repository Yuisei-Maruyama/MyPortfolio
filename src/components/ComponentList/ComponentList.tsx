import React from 'react'
import { useHistory } from 'react-router-dom'
import TreeItem from '@mui/lab/TreeItem'

type Props = {
  getParams: (params: string) => void
  componentsFileNameList: string[]
}

const ComponentList: React.FC<Props> = (props: Props) => {
  const history = useHistory()

  const { getParams, componentsFileNameList } = props

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
      {componentsFileNameList.map((component, index) => {
        return (
          <TreeItem
            color='#FFFFFF'
            key={index}
            nodeId={index.toString()}
            label={component}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewComponent(e)}
          ></TreeItem>
        )
      })}
    </>
  )
}

export default ComponentList
