import React, { memo } from 'react'
import { TreeView, TreeItem } from '@mui/lab'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { ducumentList } from '@/data/ducumentList'
import { DocumentItem } from '@/types'
import { useShowTree } from '@/customHooks/'

const DocumentListTree: React.FC = () => {
  const { previewTree } = useShowTree()

  const documentListData = ducumentList(previewTree)

  const renderTree = (nodesList: DocumentItem[]) =>
    nodesList.map((nodes) => {
      return (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.label} onClick={nodes.onClick}>
          {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree([node])) : null}
        </TreeItem>
      )
    })

  return (
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ overflowY: 'auto' }}
    >
      {renderTree(documentListData)}
    </TreeView>
  )
}

export default memo(DocumentListTree)
