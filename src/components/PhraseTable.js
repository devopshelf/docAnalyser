import React from 'react'
import { Table , Icon, Container } from 'semantic-ui-react';
import CustomMessage from './CustomMessage';

export default class PhraseTable extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       sortUp:true,
       dataArray:this.props.dataArray
    }
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.dataArray !== this.props.dataArray){
      this.setState({
        dataArray:this.props.dataArray
      })
    }
  }

  handleAscSort = () => {
    let newDataArray = [...this.state.dataArray];
    newDataArray.sort((a,b)=>{
      return a.time - b.time
    })
    this.setState({
      sortUp:true,
      dataArray:newDataArray
    })
  }
  
  handleDescSort = () => {
    let newDataArray = [...this.state.dataArray];
    newDataArray.sort((a,b)=>{
      return b.time - a.time
    })
    this.setState({
      sortUp:false,
      dataArray:newDataArray
    })
  }
  render(){
    const rows = this.state.dataArray.map(d => {
      if(d.phrase !== ""){
        return(
          <Table.Row key={d.id}>
              <Table.Cell>{d.phrase}</Table.Cell>
              <Table.Cell>{d.time}</Table.Cell>
              <Table.Cell>
                <Icon 
                style={{
                  color:"red",
                  cursor:"pointer"
                }}
                name="close"
                onClick={()=>{
                  this.props.deletePhrase(d.id)
                }}
                />
              </Table.Cell>
          </Table.Row>
        )
      }else{
          return ""
      }
    })
    return (
      <Container fluid={true} style={{
        minHeight:"400px"
      }}>
      { this.state.dataArray.length < 1 ? 
     <CustomMessage  header='NO DATA!!'
     content='Go to viewer and select the data you want to analyse'/>  :
      <Table style={{
        maxHeight:"500px",
        overflowY:"scroll"
      }} celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Phrase</Table.HeaderCell>
                <Table.HeaderCell>Time(sec)
                  {this.state.sortUp ?  
                  <Icon style={{cursor:"pointer"}} name="arrow down" onClick={this.handleDescSort} /> :
                  <Icon style={{cursor:"pointer"}} name="arrow up"  onClick={this.handleAscSort} />}
                </Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
            {rows}
        </Table.Header>
      </Table>
      }
      </Container>
    )
  }
}
