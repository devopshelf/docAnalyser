import React, { Component } from 'react'
import Viewer from './Viewer';
import { Container } from 'semantic-ui-react';
import Header from './Header';

export default class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Header />
        <Viewer />
      </Container>
    )
  }
}
