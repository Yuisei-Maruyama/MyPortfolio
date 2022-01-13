import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { Main, Board, History, Art, Travel, Document } from '@/pages'
import { Header, Footer } from '@/components'

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Container maxWidth="xl" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/board" component={Board} />
            <Route path="/history" component={History} />
            <Route path="/art" component={Art} />
            <Route path="/travel" component={Travel} />
            <Route path="/document/:label" component={Document} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </div>
  )
}

export default App
