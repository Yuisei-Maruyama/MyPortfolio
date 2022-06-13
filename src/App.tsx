import React, { useState, ReactNode, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import { Main, Board, History, Travel, Instructions, DocumentsPreviewer, ComponentsPreviewer } from '@/pages'
import {
  ThemeProvider,
  Header,
  Footer,
  MarkdownPreviewer,
  ComponentPreviewTabs,
  CommandListProvider,
} from '@/components'
import { commandList } from './data/commandList'
import useInterval from '@use-it/interval'
import { rgba } from 'polished'

const App: React.FC = () => {
  const [component, setComponent] = useState<ReactNode>()
  const [isDelete, setDeleteComponents] = useState<boolean>(true)

  useInterval(async () => {
    await setDeleteComponents(true)
    await setComponent(undefined)
  }, 20000)

  useEffect(() => {
    setDeleteComponents(false)
  }, [component])

  return (
    <div
      className="App"
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#021114' }}
    >
      <Router>
        <ThemeProvider mode="dark">
          <CommandListProvider commandList={commandList} setComponent={setComponent}>
            {!isDelete && component}
            <Box>
              <Header></Header>
            </Box>
            <Container maxWidth="xl" style={{ padding: '0 0 70px 0' }}>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/board" component={Board} />
                <Route exact path="/history" component={History} />
                {/* <Route exact path="/matrix" component={Matrix} /> */}
                <Route exact path="/travel" component={Travel} />
                <Route exact path="/instructions" component={Instructions} />
                <Route path="/documents" component={DocumentsPreviewer} />
                <Route path="/documents/:label" component={MarkdownPreviewer} />
                <Route path="/components" component={ComponentsPreviewer} />
                <Route path="/components/:label" component={ComponentPreviewTabs} />
              </Switch>
            </Container>
            <Box sx={{ position: 'fixed', width: '100%', bottom: 0, right: 0, backgroundColor: rgba(0, 26, 26, 1) }}>
              <Footer />
            </Box>
          </CommandListProvider>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App
