import React from 'react'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { DocumentList, MarkdownPreviewer } from '@/components'
import { Box } from '@mui/material'
import { useSetParams } from '@/customHooks'

const Document: React.FC = () => {

  const { getParams, params } = useSetParams()

  return (
    <Box sx={{ margin: "2% 4%", display: 'flex' }}>
      <TreeView
        aria-label="icon expansion"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 1200, flexGrow: 1, maxWidth: 400, overflowY: 'auto', marginRight: '10%' }}
      >
        <DocumentList getParams={getParams} />
      </TreeView>
      <div>
        {
          params
            ? (
              <Box sx={{ width: '80%'}}>
                <MarkdownPreviewer fileName={`${params}.md`} />
              </Box>
            )
            : <p>左のドキュメントリストを選択すると、ここにMarkdownがプレビューされます。</p>
        }
      </div>
    </Box>
  )
}

export default Document
