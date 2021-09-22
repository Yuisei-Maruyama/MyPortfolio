import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Main from './pages/Main'
import Job from './pages/Job'
import Hobby from './pages/Hobby'
import { Header } from '@/components'

const App: React.FC = () => {
  return (
    <div className="App">
      <Header></Header>
      <Container fixed>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/job" component={Job} />
            <Route exact path="/hobbies" component={Hobby} />
          </Switch>
        </Router>
      </Container>
    </div>
  )
}

export default App
