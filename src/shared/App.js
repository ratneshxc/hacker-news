import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import NoMatch from './NoMatch';
import Home from './Home';
import Grid from './Grid';
import { fetchPopularRepos } from './api';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
           <Route path={'/'} exact render={(props) => (
              <Home />
            )} />
            <Route path={'/news/:id'} exact render={(props) => (
              <Grid {...props} fetchInitialData={(path = '') => fetchPopularRepos(path.split('/').pop())} />
            )} />
          <Route render={(props) => <NoMatch {...props} /> } />

        </Switch>
      </div>
    )
  }
}

export default App