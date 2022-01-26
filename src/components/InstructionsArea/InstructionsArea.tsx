import React from 'react'
import { rgba } from 'polished'
import { Box } from '@mui/material'
import { BoxProps } from '@mui/material/Box'
import { hachiMaruPopFont } from '@/components/ThemeProvider'
import { ThemeProvider } from '@/components'

const Item = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  )
}

const InstructionsArea: React.FC = () => {

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap" rel="stylesheet" />
      <ThemeProvider theme={hachiMaruPopFont}>
        <div style={{ width: '85%', height: 1000, margin: '60px auto 0', backgroundColor: rgba(0, 0, 0, 0.3), borderRadius: 40 }}>
          <Box sx={{ paddingTop: '1%' }}>
            <h1 style={{ textAlign: 'center' }}>〜各画面の表示内容の説明〜</h1>
            <Box
              sx={{
                marginTop: 5,
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(6, 1fr)',
                gridTemplateAreas: `
                '. . main taskboard . .'
                '. . components documents . .'
                `
              }}
            >
              <Item sx={{ gridArea: 'main', color: 'white'}}>・メイン画面</Item>
              <Item sx={{ gridArea: 'components', color: 'white'}}>・コンポーネントリスト画面</Item>
              <Item sx={{ gridArea: 'documents', color: 'white'}}>・ドキュメントリスト画面</Item>
              <Item sx={{ gridArea: 'taskboard', color: 'white'}}>・タスク管理画面</Item>
            </Box>
          </Box>
        </div>
      </ThemeProvider>
    </>
  )
};

export default InstructionsArea;
