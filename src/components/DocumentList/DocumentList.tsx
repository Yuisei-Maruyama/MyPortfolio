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
          <TreeItem nodeId="2" label="README" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
          <TreeItem nodeId="3" label="React">
            <TreeItem nodeId="4" label="Environment" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
            <TreeItem nodeId="27" label="Basics" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
            <TreeItem nodeId="28" label="PerformanceTuning" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
            <TreeItem nodeId="5" label="props" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
            <TreeItem nodeId="6" label="React Hooks">
              <TreeItem nodeId="7" label="useState" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
              <TreeItem nodeId="8" label="useEffect" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
              <TreeItem nodeId="9" label="useContext" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
              <TreeItem nodeId="10" label="useReducer" />
              <TreeItem nodeId="11" label="useRef" />
              <TreeItem nodeId="12" label="useCallback" />
              <TreeItem nodeId="13" label="useMemo" />
            </TreeItem>
            <TreeItem nodeId="14" label="react-router-dom" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
            <TreeItem nodeId="15" label="styled-components" />
            <TreeItem nodeId="16" label="Suspense" />
            <TreeItem nodeId="17" label="OAuth" />
            <TreeItem nodeId="18" label="Apollo-Client" />
            <TreeItem nodeId="21" label="MaterialUI" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
          </TreeItem>
          <TreeItem nodeId="19" label="Vue">
            <TreeItem nodeId="20" label="Vue v3.x" />
          </TreeItem>
        </TreeItem>
      </Box>
      <Box sx={{ marginTop: '10%'}}>
        <TreeItem nodeId="22" label="Back-End">
          <TreeItem nodeId="23" label="Node.js" />
          <TreeItem nodeId="24" label="OpenAPI" />
        </TreeItem>
      </Box>
      <Box sx={{ marginTop: '10%'}}>
        <TreeItem nodeId="25" label="TypeScript">
        <TreeItem nodeId="26" label="types-cheat-sheet" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
        </TreeItem>
      </Box>
    </>
  )
}

export default DocumentList
