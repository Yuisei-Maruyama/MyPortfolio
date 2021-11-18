import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Main from './pages/Main'
import Art from './pages/Art'
import Travel from './pages/Travel'
import Technology from './pages/Technology'
import { Header } from '@/components'

const App: React.FC = () => {

  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Container fixed>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/technology" component={Technology} />
              <Route exact path="/art" component={Art} />
              <Route exact path="/travel" component={Travel} />
            </Switch>
        </Container>
      </Router>
    </div>
  )
}

export default App
