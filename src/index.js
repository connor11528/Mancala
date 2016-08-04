import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import App from './components/App'
import Dashboard from './components/Dashboard'
import GameBoards from './components/GameBoards'
import GameBoard from './components/GameBoard'


render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="gameboards" component={GameBoards} />
      <Route path="gameboards" component={GameBoard} />
    </Route>
  </Router>,
  document.getElementById('root')
)
