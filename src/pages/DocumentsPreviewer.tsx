import React from 'react'
import { DocumentListTree, MarkdownPreviewer } from '@/components'
import { Box } from '@mui/material'
import { useSetParams } from '@/customHooks'

const DocumentsPreviewer: React.FC = () => {
  const { getParams, params } = useSetParams()

  return (
    <Box sx={{ margin: '2% 2% 5% 2%', display: 'flex' }}>
      <Box sx={{ padding: 3, border: 'solid 1px #06D8D7', borderRadius: 3 }}>
        <DocumentListTree getParams={getParams} />
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
