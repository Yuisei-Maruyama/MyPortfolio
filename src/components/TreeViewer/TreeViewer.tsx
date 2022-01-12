import React from 'react'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { ComponentList, DocumentList } from '@/components'

const TreeViewer: React.FC = () => {
  return (
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 1200, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <ComponentList />
      <DocumentList />
    </TreeView>
  )
}

export default TreeViewer
