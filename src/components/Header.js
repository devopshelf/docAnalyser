import React from 'react'
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Header as='h3' block>
        <Link to="/">Docs Analyser</Link>
    </Header>
  )
}
