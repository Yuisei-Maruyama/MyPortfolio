import React from 'react'
import TreeItem from '@mui/lab/TreeItem'
import { useHistory } from 'react-router-dom'
import { Box } from '@mui/material'

type Props = {
  getParams: (params: string) => void
}

const DocumentList: React.FC<Props> = (props: Props) => {
  const history = useHistory()

  const { getParams } = props

  const handleToDocument = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!getParams) return
    const param = (event.target as unknown as { textContent: string }).textContent
    getParams(param)
    history.push(`/documents/${param}`)
  }

  const previewDocument = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    handleToDocument(event)
  }

  return (
    <>
      <Box>
        <TreeItem nodeId="1" label="Front-End">
          <TreeItem
            nodeId="2"
            label="README"
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
          />
          <TreeItem nodeId="3" label="React">
            <TreeItem
              nodeId="4"
              label="Environment"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
            />
            <TreeItem
              nodeId="99"
              label="Basics"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
            />
            <TreeItem
              nodeId="100"
              label="PerformanceTuning"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
            />
            <TreeItem
              nodeId="5"
              label="Props(React)"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
            />
            <TreeItem nodeId="6" label="React Hooks">
              <TreeItem
                nodeId="7"
                label="useState"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
              />
              <TreeItem
                nodeId="8"
                label="useEffect"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
              />
              <TreeItem
                nodeId="9"
                label="useContext"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
              />
              <TreeItem nodeId="10" label="useReducer" />
              <TreeItem nodeId="11" label="useRef" />
              <TreeItem
                nodeId="12"
                label="useCallback"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
              />
              <TreeItem
                nodeId="13"
                label="useMemo"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
              />
            </TreeItem>
            <TreeItem
              nodeId="14"
              label="react-router-dom"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
            />
            <TreeItem nodeId="15" label="styled-components" />
            <TreeItem nodeId="16" label="Suspense" />
            <TreeItem nodeId="17" label="OAuth" />
            <TreeItem nodeId="18" label="Apollo-Client" />
            <TreeItem
              nodeId="19"
              label="MaterialUI"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
            />
            <TreeItem
              nodeId="80"
              label="NextJS"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
            ></TreeItem>
            <TreeItem
              nodeId="81"
              label="SSG/SSR"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
            ></TreeItem>
          </TreeItem>
          <TreeItem nodeId="20" label="Vue">
            <TreeItem
              nodeId="40"
              label="Tips(Vue)"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
            />
            <TreeItem nodeId="21" label="CompositionAPI">
              <TreeItem
                nodeId="22"
                label="Props(Vue)"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
              />
              <TreeItem
                nodeId="23"
                label="Emit"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
              />
              <TreeItem
                nodeId="24"
                label="Two-Way Binding"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
              />
            </TreeItem>
            <TreeItem
              nodeId="54"
              label="Provide&Inject"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
            />
            <TreeItem
              nodeId="55"
              label="NuxtJS"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
            />
          </TreeItem>
        </TreeItem>
      </Box>
      <Box sx={{ marginTop: '10%' }}>
        <TreeItem nodeId="25" label="Back-End">
          <TreeItem
            nodeId="26"
            label="NodeJs"
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
          />
          <TreeItem nodeId="27" label="OpenAPI" />
        </TreeItem>
      </Box>
      <Box sx={{ marginTop: '10%' }}>
        <TreeItem nodeId="28" label="TypeScript">
          <TreeItem
            nodeId="29"
            label="types-cheat-sheet"
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
          />
        </TreeItem>
      </Box>
      <Box sx={{ marginTop: '10%' }}>
        <TreeItem nodeId="101" label="Utils">
          <TreeItem
            nodeId="102"
            label="Commands"
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)}
          />
        </TreeItem>
      </Box>
    </>
  )
}

export default DocumentList
