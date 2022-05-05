import React from 'react'
import { Box } from '@mui/material'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { ComponentList, ComponentPreviewTabs } from '@/components'
import * as componentsExports from '@/components'
import { useSetParams } from '@/customHooks'

const componentsFileNameList: string[] = Object.keys(componentsExports)
  .filter(
    (exportItem) => exportItem !== 'getHeaders' && exportItem !== 'convertIssueId' && exportItem !== 'convertLabel'
  )
  .sort()

const ComponentsPreviewer: React.FC = () => {
  const { getParams, params } = useSetParams()

  return (
    <Box sx={{ margin: '2% 3% 5% 2%', display: 'flex' }}>
      <Box sx={{ padding: 3, border: 'solid 1px #06D8D7', borderRadius: 3 }}>
        <TreeView
          aria-label="icon expansion"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ overflowY: 'auto' }}
        >
          <ComponentList getParams={getParams} componentsFileNameList={componentsFileNameList} />
        </TreeView>
      </Box>
      <>
        {params ? (
          <Box sx={{ width: '100%', paddingLeft: '6%' }}>
            <ComponentPreviewTabs params={params} />
          </Box>
        ) : (
          <Box sx={{ marginLeft: '20%' }}>
            <p>
              左のコンポーネントリストから対象のラベルを選択すると、ここに選択されたComponentの詳細がプレビューされます。
            </p>
          </Box>
        )}
      </>
    </Box>
  )
}

export default ComponentsPreviewer
