import React, { Component } from 'react'
import CustomMessage from './CustomMessage';
import { Container, Table } from 'semantic-ui-react';

export default class Report extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       dataArray: this.props.dataArray,
       minTime:0,
       maxTime:0
    }
  }
    
  componentDidMount(){
    if(this.state.dataArray.length > 0){
      let sortedArr = [...this.props.dataArray];
      sortedArr.sort((a,b)=>{
        return a.time - b.time
      })
      this.setState({
        minTime:sortedArr[0].time,
        maxTime:sortedArr[sortedArr.length - 1].time
      })
    }
  }
  render() {
    const avgTime = (parseInt(this.state.minTime) + parseInt(this.state.maxTime))/2; 
    const minPhraseList = this.state.dataArray.filter(d =>{
      return parseInt(d.time) < avgTime;
    })
    const maxPhraseList = this.state.dataArray.filter(d =>{
      return parseInt(d.time) > avgTime;
    })

    const max = maxPhraseList.map((d,k)=>{
      return(
        <Table.Row key={k}>
          <Table.Cell>{d.phrase}</Table.Cell>
          <Table.Cell>{d.time}sec</Table.Cell>
        </Table.Row>
      )
    })
    const min = minPhraseList.map((d,k)=>{
      return(
        <Table.Row key={k}>
          <Table.Cell>{d.phrase}</Table.Cell>
          <Table.Cell>{d.time}sec</Table.Cell>
        </Table.Row>
      )
    })
  
    return (
      <>
        { this.state.dataArray.length < 1 ? 
          <CustomMessage  header='NO DATA!!'
            content='Go to viewer and select the data you want to analyse'/> :
        <Container>
            <h1>You have marked {this.props.dataArray.length} Phrases as Important!!!</h1>
            <img src="https://drive.google.com/file/d/14-r1tX5DR49-nZCgj5FLiB_IZN5J9Hx_/view" alt="data-mode" />
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='2'>Most Time Consuming Phrases</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {max}
              </Table.Body>
            </Table>
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='2'>Least Time Consuming Phrases</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {min}
              </Table.Body>
            </Table>
        </Container>
        }
      </>
    )
  }
}
