import React, { useContext } from 'react'
import TreeItem from '@mui/lab/TreeItem'
import { useHistory, withRouter } from 'react-router-dom'
import { DocumentContext } from '@/components/Menu/Menu'

const DocumentList: React.FC = () => {

  const history = useHistory()

  const { toggle, handleDrawerToggle } = useContext(DocumentContext)

  const handleToDocument = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const param = (event.target as unknown as { textContent: string }).textContent
    history.push(`/document/${param}`)
  }


  return (
    <>
      <TreeItem nodeId="7" label="Documents">
        <TreeItem nodeId="20" label="Front-End">
          <TreeItem nodeId="8" label="README" />
          <TreeItem nodeId="9" label="React">
            <TreeItem nodeId="26" label="Environment" onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => handleToDocument(e).then(() => {
              if (!toggle || !handleDrawerToggle) return
              handleDrawerToggle(toggle)
            })} />
            <TreeItem nodeId="10" label="React Hooks">
              <TreeItem nodeId="11" label="useState" />
              <TreeItem nodeId="12" label="useEffect" />
              <TreeItem nodeId="13" label="useRef" />
              <TreeItem nodeId="14" label="useCallback" />
            </TreeItem>
            <TreeItem nodeId="15" label="react-router-dom" />
            <TreeItem nodeId="16" label="styled-components" />
            <TreeItem nodeId="17" label="Suspense" />
            <TreeItem nodeId="18" label="OAuth" />
            <TreeItem nodeId="19" label="Apollo-Client" />
          </TreeItem>
          <TreeItem nodeId="21" label="Vue">
            <TreeItem nodeId="22" label="Vue v3.x" />
          </TreeItem>
        </TreeItem>
        <TreeItem nodeId="23" label="Back-End">
          <TreeItem nodeId="24" label="Node.js" />
          <TreeItem nodeId="25" label="OpenAPI" />
        </TreeItem>
      </TreeItem>
    </>
  )
}

export default withRouter(DocumentList)
