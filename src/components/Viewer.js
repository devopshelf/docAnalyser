import React, { Component } from 'react'
import '../css/viewer.component.css';
import ToolBar from './ToolBar';
import PhraseTable from './PhraseTable';
import dummy from  "../data/dummy";
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import Report from './Report';
import Axios from 'axios';
import { ENDPOINT,ENDPOINT1  } from "../config/endpoints";

export default class Viewer extends Component {
  state = {
      dataArr:[],
      selected:"",
      timer:0,
      id:1,
      data:"",
      showTable:false,
      showReport:false,
      showViewer:true,
      fileName:this.props.match.params.fileName
  }
  handleSelect = (event) =>{
    if(this.state.selected !== event.target.value.substring(event.target.selectionStart, event.target.selectionEnd) && this.state.selected !== ""){
        let endTime = ((new Date().getTime()) - this.state.timer) / 1000;
        let phraseData = {
            time:endTime,
            phrase:this.state.selected,
            id:this.state.id,
            length:this.state.selected.length
        }
        this.setState({
            dataArr:[...this.state.dataArr,phraseData],
            id:this.state.id + 1
        })
    }
    
    this.setState({
        selected:event.target.value.substring(event.target.selectionStart, event.target.selectionEnd),
        timer: new Date().getTime()
    })
}

  componentDidMount(){
    Axios.all([
      Axios.get(ENDPOINT+"/getDocContent",{
        params:{
          filename:this.state.fileName
        }
      }),
      Axios.get(ENDPOINT+"/getPhrases/",{
        params:{ documentID:this.props.match.params.id }
      })
    ])
    .then(Axios.spread((docData,phraseData)=>{
      this.setState({
        data:docData.data.docContent,
        dataArr:phraseData.data.length > 0 ? phraseData.data[0].phraseInfo : []
      })
    }))
  }

  handleSubmit= () => {
      Axios.post(ENDPOINT+"/updatePhrases",{
        documentId:this.props.match.params.id,
        documentName:this.props.match.params.fileName,
        phraseInfo:this.state.dataArr
      })
      .then(response => {
          Axios.get(ENDPOINT1+"/readTrigger")
          .then(r => console.log("trigged"))
          .catch(e => console.log(e))
          alert("Data is Saved")
        })
      .catch(error => console.log(error))
      //console.log("data is saved",this.state.dataArr);
  }

  showTable = () =>{
    this.setState({
      showTable:true,
      showReport:false,
      showViewer:false
    })
  }
  showViewer =()=>{
    this.setState({
      showTable:false,
      showReport:false,
      showViewer:true
    })
  }

  showReport = () =>{
    this.setState({
      showTable:false,
      showReport:true,
      showViewer:false
    })
  }

  deletePhrase = (id) =>{
    let newDataArr = [...this.state.dataArr];
    const findPhraseWithId = newDataArr.filter(d =>{
      return d.id === id;
    })
    const index = newDataArr.indexOf(findPhraseWithId[0]);
    newDataArr.splice(index,1);
    this.setState({
      dataArr:newDataArr
    })
  }
    


  render() { 
    //console.log("CONSOLE",this.props.match.params.id);
     
    return (
      <>
        {this.state.data === "" ? 
          <Dimmer active style={{height:"100%",width:"100%"}}>
            <Loader>Loading...</Loader>
          </Dimmer> :
          <Container fluid={true}>
          <ToolBar 
          handleSubmit={this.handleSubmit}
          showTable={this.showTable}
          showViewer={this.showViewer}
          showReport = {this.showReport}
          />
          {this.state.showTable ? 
            <PhraseTable 
              dataArray={this.state.dataArr}
              deletePhrase = {this.deletePhrase}
            /> 
            :
            this.state.showReport ?
            <Report dataArray={this.state.dataArr} />
            :
            <textarea name="text" 
                    rows="20" 
                    cols="20" 
                    className="viewer-textarea" 
                    onSelect={this.handleSelect}
                    wrap="soft"
                    readOnly={true}
                    defaultValue={this.state.data}
            >
            </textarea>    
          }
        </Container>
        }
      </>
    )
  }
}
