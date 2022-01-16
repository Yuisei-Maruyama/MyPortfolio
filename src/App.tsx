import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { Box } from '@mui/material'
import { rgba } from 'polished'
import { Main, Board, History, Art, Travel, DocumentsPreviewer, ComponentsPreviewer } from '@/pages'
import { Header, Footer, MarkdownPreviewer, ComponentPreviewTabs } from '@/components'


const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Box>
          <Header />
        </Box>
        <Container maxWidth="xl" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/board" component={Board} />
            <Route exact path="/history" component={History} />
            <Route exact path="/art" component={Art} />
            <Route exact path="/travel" component={Travel} />
            <Route path="/documents" component={DocumentsPreviewer} />
            <Route path="/documents/:label" component={MarkdownPreviewer} />
            <Route path="/components" component={ComponentsPreviewer} />
            <Route path="/components/:label" component={ComponentPreviewTabs} />
          </Switch>
        </Container>
        <Box sx={{ position: 'fixed', width: '100%', bottom: 0, right: 0, backgroundColor: rgba(0,26,26, 1) }}>
          <Footer />
        </Box>
      </Router>
    </div>
  )
}

export default App
