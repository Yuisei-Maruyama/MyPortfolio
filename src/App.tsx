import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { Main, Board, Technology, Art, Travel } from '@/pages'
import { Header } from '@/components'

const App: React.FC = () => {

  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Container fixed>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/board" component={Board} />
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
