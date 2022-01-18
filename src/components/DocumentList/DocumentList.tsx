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
        <TreeItem nodeId="20" label="Front-End">
          <TreeItem nodeId="8" label="README" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
          <TreeItem nodeId="9" label="React">
            <TreeItem nodeId="26" label="Environment" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
            <TreeItem nodeId="27" label="props" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
            <TreeItem nodeId="10" label="React Hooks">
              <TreeItem nodeId="11" label="useState" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
              <TreeItem nodeId="12" label="useEffect" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
              <TreeItem nodeId="28" label="useContext" />
              <TreeItem nodeId="29" label="useReducer" />
              <TreeItem nodeId="13" label="useRef" />
              <TreeItem nodeId="14" label="useCallback" />
              <TreeItem nodeId="30" label="useMemo" />
            </TreeItem>
            <TreeItem nodeId="15" label="react-router-dom" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
            <TreeItem nodeId="16" label="styled-components" />
            <TreeItem nodeId="17" label="Suspense" />
            <TreeItem nodeId="18" label="OAuth" />
            <TreeItem nodeId="19" label="Apollo-Client" />
          </TreeItem>
          <TreeItem nodeId="21" label="Vue">
            <TreeItem nodeId="22" label="Vue v3.x" />
          </TreeItem>
          <TreeItem nodeId="27" label="MaterialUI" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
        </TreeItem>
      </Box>
      <Box sx={{ marginTop: '10%'}}>
        <TreeItem nodeId="23" label="Back-End">
          <TreeItem nodeId="24" label="Node.js" />
          <TreeItem nodeId="25" label="OpenAPI" />
        </TreeItem>
      </Box>
      <Box sx={{ marginTop: '10%'}}>
        <TreeItem nodeId="26" label="TypeScript">
        <TreeItem nodeId="15" label="types-cheat-sheet" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => previewDocument(e)} />
        </TreeItem>
      </Box>
    </>
  )
}

export default DocumentList
