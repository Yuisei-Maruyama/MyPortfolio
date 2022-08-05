import React, { useState, useEffect } from 'react'
import { DocumentListTree, MarkdownPreviewer } from '@/components'
import { Box } from '@mui/material'
import { useLocation } from 'react-router-dom'

const DocumentsPreviewer: React.FC = () => {
  const [params, setParam] = useState<string | string[]>('')

  const location = useLocation()

  useEffect(() => {
    const targetParam = location.pathname.split('/')[2]
    setParam(targetParam)
  }, [location])

  return (
    <Box sx={{ margin: '2% 2% 5% 2%', display: 'flex' }}>
      <Box sx={{ height: 'fit-content', marginTop: '30px', padding: 3, border: 'solid 1px #06D8D7', borderRadius: 3 }}>
        <DocumentListTree />
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
