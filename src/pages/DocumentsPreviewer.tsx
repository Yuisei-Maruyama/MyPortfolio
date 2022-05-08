import React from 'react'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { DocumentList, MarkdownPreviewer } from '@/components'
import { Box } from '@mui/material'
import { useSetParams } from '@/customHooks'

const DocumentsPreviewer: React.FC = () => {
  const { getParams, params } = useSetParams()

  return (
    <Box sx={{ margin: '2% 2% 5% 2%', display: 'flex' }}>
      <Box sx={{ padding: 3, border: 'solid 1px #06D8D7', borderRadius: 3 }}>
        <TreeView
          aria-label="icon expansion"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ overflowY: 'auto' }}
        >
          <DocumentList getParams={getParams} />
        </TreeView>
      </Box>
      <>
        {params ? (
          <Box sx={{ width: '75%', paddingLeft: '6%' }}>
            <MarkdownPreviewer fileName={`${params}`} />
          </Box>
        ) : (
          <Box sx={{ marginLeft: '20%' }}>
            <p>左のドキュメントリストを選択すると、ここにMarkdownがプレビューされます。</p>
          </Box>
        )}
      </>
    </Box>
  )
}

export default DocumentsPreviewer
