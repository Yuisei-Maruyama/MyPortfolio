import React from 'react'
import { Box } from '@mui/material'
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
      <Box sx={{ marginTop: "5%" }}>
        <ComponentList />
      </Box>
      <Box sx={{ marginTop: "10%" }}>
        <DocumentList />
      </Box>
    </TreeView>
  )
}

export default TreeViewer
