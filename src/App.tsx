import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { Main, Board, History, Art, Travel } from '@/pages'
import { Header, Footer } from '@/components'

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Container maxWidth="xl" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/board" component={Board} />
            <Route exact path="/history" component={History} />
            <Route exact path="/art" component={Art} />
            <Route exact path="/travel" component={Travel} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </div>
  )
}

export default App
