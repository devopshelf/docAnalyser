import React, { Component } from 'react'
import Viewer from './Viewer';
import Header from './Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DocList from './DocList';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={DocList} />
          <Route path="/viewer/:fileName/:id" component={Viewer} />
        </Switch>
      </Router>
    )
  }
}
