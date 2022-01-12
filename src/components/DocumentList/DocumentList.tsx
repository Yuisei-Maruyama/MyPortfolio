import React from 'react'
import { CustomTreeItem } from '@/components/TreeViewer/TreeViewer'

const DocumentList: React.FC = () => {
  return (
    <>
      <CustomTreeItem nodeId="7" label="Documents">
        <CustomTreeItem nodeId="20" label="Front-End">
          <CustomTreeItem nodeId="8" label="README" />
          <CustomTreeItem nodeId="9" label="React">
            <CustomTreeItem nodeId="10" label="React Hooks">
              <CustomTreeItem nodeId="11" label="useState" />
              <CustomTreeItem nodeId="12" label="useEffect" />
              <CustomTreeItem nodeId="13" label="useRef" />
              <CustomTreeItem nodeId="14" label="useCallback" />
            </CustomTreeItem>
            <CustomTreeItem nodeId="15" label="react-router-dom" />
            <CustomTreeItem nodeId="16" label="styled-components" />
            <CustomTreeItem nodeId="17" label="Suspense" />
            <CustomTreeItem nodeId="18" label="OAuth" />
            <CustomTreeItem nodeId="19" label="Apollo-Client" />
          </CustomTreeItem>
          <CustomTreeItem nodeId="21" label="Vue">
            <CustomTreeItem nodeId="22" label="Vue v3.x" />
          </CustomTreeItem>
        </CustomTreeItem>
        <CustomTreeItem nodeId="23" label="Back-End">
          <CustomTreeItem nodeId="24" label="Node.js" />
          <CustomTreeItem nodeId="25" label="OpenAPI" />
        </CustomTreeItem>
      </CustomTreeItem>
    </>
  )
}

export default DocumentList
