import React, { useState } from 'react'
import { rgba } from 'polished'
import { Box, Card, CardMedia, CardActionArea, Dialog, DialogContent } from '@mui/material'
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

  const [open, setOpen] = useState<boolean>(false)
  const [image, setImage] = useState<{ src: string, alt: string}>({ src: '', alt: '' })

  const handleClickClose = () => {
    setOpen(false)
  }

  const handleClickOpen = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const image = { src: (e.target as unknown as { src: string }).src, alt: (e.target as unknown as { alt: string }).alt }
    setImage(image)
    setOpen(true)
  }

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
              <Item sx={{ gridArea: 'taskboard', color: 'white' }}>・タスク管理画面</Item>
            </Box>
            <Box sx={{ marginTop: 15 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ width: 400, transform: 'rotate(-6deg)', border: 'solid 1px #06D8D7' }}>
                  <CardActionArea onClick={(e) => handleClickOpen(e)}>
                    <CardMedia
                      component="img"
                      height="230"
                      image="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/add-instructions/public/assets/pages/Main.png?raw=true"
                      alt="Main"
                      />
                    </CardActionArea>
                </Card>
                <Card sx={{ width: 400, transform: 'rotate(5deg)', border: 'solid 1px #06D8D7' }}>
                  <CardActionArea onClick={handleClickOpen}>
                    <CardMedia
                      component="img"
                      height="230"
                      image="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/add-instructions/public/assets/pages/TaskBoard.png?raw=true"
                      alt="TaskBoard"
                    />
                  </CardActionArea>
                </Card>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: -2, }}>
                <Card sx={{ width: 400, marginLeft: 7, transform: 'rotate(3deg)', border: 'solid 1px #06D8D7' }}>
                  <CardActionArea onClick={handleClickOpen}>
                    <CardMedia
                        component="img"
                        height="230"
                        image="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/add-instructions/public/assets/pages/ComponetList.png?raw=true"
                        alt="ComponentList"
                      />
                  </CardActionArea>
                </Card>
                <Card sx={{ width: 400, marginRight: 3, transform: 'rotate(-4deg)', border: 'solid 1px #06D8D7' }}>
                  <CardActionArea onClick={handleClickOpen}>
                    <CardMedia
                      component="img"
                      height="230"
                      image="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/add-instructions/public/assets/pages/DocumentList.png?raw=true"
                      alt="DocumentList"
                    />
                  </CardActionArea>
                </Card>
              </Box>
            </Box>
            <Dialog onClose={handleClickClose} open={open} fullWidth maxWidth="lg">
              <DialogContent sx={{ padding: 0 }}>
              <CardMedia
                component="img"
                image={image.src}
                alt={ image.alt }
              />
              </DialogContent>
            </Dialog>
          </Box>
        </div>
      </ThemeProvider>
    </>
  )
};

export default InstructionsArea;
