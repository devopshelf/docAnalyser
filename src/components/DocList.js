import React, { Component } from 'react'
import dummy from "../data/dummy";
import { Segment, Container, Message, Input, Dimmer, Loader, Card , Icon  } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../css/viewer.component.css';
import Axios from 'axios';

export default class DocList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isLoading:false, 
       fileData:[],
       searchValue:"",
       masterFileData:[]
    }
  }

  componentDidMount(){
    this.setState({
      isLoading:true
    })
    Axios.get("http://192.168.43.192:8300/bb/rest/getDocumentList")
    .then((response) =>{
      console.log("DATA from DB",response.data.length)
      this.setState({
        fileData:response.data,
        masterFileData:response.data,
        isLoading:false
      })
    })
    .catch(e => console.log(e))
  }
  handleChange = (e) =>{
    this.setState({
      searchValue:e.target.value
    })
    let newData = this.state.masterFileData.filter(d =>{
        return d.fileName.toLowerCase().includes(e.target.value.toLowerCase())
    })
    if(e.target.value !== ""){
      this.setState({
        fileData:newData
      })
    }else{
      this.setState({
        fileData:this.state.masterFileData
      })
    } 
  }
    
  render() {
    console.log("DATA", this.state.fileData.length)
    const files = this.state.fileData.map((data,key)=>{
      const fileName = "/viewer/"+data.fileName+"/"+data.id;
        return (
          <Link key={key} to={fileName}>
            <Card style={{marginTop:"10px"}}>
                <Card.Content>
                  <Icon name="file" />
                  <Card.Description>{data.fileName}</Card.Description>
                </Card.Content>
            </Card>
          </Link>
            )
    })
    return (
    <>
      {this.state.isLoading ? 
      <Dimmer active style={{height:"100%",width:"100%"}}>
        <Loader>Loading...</Loader>
      </Dimmer> :
      <Container>
      <Message
            icon='file word'
            header='Select the file from the panel below:'
            content='INFO: Focus on the text to mark it as important'
        />
      <Input type="text"
             placeholder="Search File..."
             icon="search"
             name="search"  
             value={this.state.searchValue}
             onChange={this.handleChange}   
      />       
      <Segment style={{
          marginTop:"30px",
          display:"flex",
          flexFlow:"row wrap",
          justifyContent:"space-between",
          minHeight:"500px",
          maxHeight:"600px",
          overflowY:"scroll"
          }}>
        {files}
      </Segment>
    </Container>
      }
    </>      
    )
  }
}
