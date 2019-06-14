import React, { Component } from 'react'
import CustomMessage from './CustomMessage';
import { Container } from 'semantic-ui-react';

export default class Report extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       dataArray: this.props.dataArray
    }
  }
    
  render() {
    return (
      <>
        { this.state.dataArray.length < 1 ? 
        <CustomMessage  header='NO DATA!!'
        content='Go to viewer and select the data you want to analyse'/> :
        <Container>
            
        </Container>
        }
      </>
    )
  }
}
