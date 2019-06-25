import React, { Component } from 'react'
import PhraseTable from './PhraseTable';
import { Container, Dimmer, Loader, Sidebar, Segment } from 'semantic-ui-react';
import Report from './Report';
import Axios from 'axios';
import { ENDPOINT,ENDPOINT1  } from "../config/endpoints";
import ViewMode from './ViewMode';
import MainToolBar from './toolbars/MainToolBar';
import FeatureToolBar from './toolbars/FeatureToolBar';

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
      viewMode:false,
      nightMode:false,
      size:"15px",
      visible:false,
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

  handleViewMode = () => {
    this.setState({
      viewMode:!this.state.viewMode
    })
  }

  handleNightMode = () => {
    this.setState({
      nightMode:!this.state.nightMode
    })
  }

  handleSize = (size) => {
    this.setState({
      size:size
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

  showSideBar = () =>{
    this.setState({
      visible:true
    })
  }




  render() { 
    //console.log("CONSOLE",this.props.match.params.id);
    const viewStyle = {
      width:"100%",
      minHeight:"80vh",
      fontSize:this.state.size,
      overflowY:"scroll",
      borderRadius:"5px",
      padding:"20px",
      backgroundColor:this.state.nightMode ? "#001628" : "white" ,
      color:this.state.nightMode ? "#d4bc70" : "black"
    } 
    return (
      <>
        {this.state.data === "" ? 
          <Dimmer active style={{height:"100%",width:"100%"}}>
            <Loader>Loading...</Loader>
          </Dimmer> :
          <>
             <FeatureToolBar
                  viewMode={this.state.viewMode}
                  handleViewMode={this.handleViewMode}
                  nightMode={this.state.nightMode}
                  handleNightMode={this.handleNightMode}
                  handleSize = {this.handleSize}
                  showSideBar={this.showSideBar}
                  visible={this.state.visible}
                  showViewer = {this.state.showViewer}
                  handleSubmit={this.handleSubmit}
                />
              <Sidebar.Pushable as={Segment}>
            <Container fluid={true}>
              <MainToolBar 
              showTable={this.showTable}
              showViewer={this.showViewer}
              showReport = {this.showReport}
              visible={this.state.visible}
              handleSidebarHide = { () => {
                this.setState({
                  visible:false
                })
              } }
              />
            <Sidebar.Pusher dimmed={this.state.visible}>
              {this.state.showTable ? 
                <PhraseTable 
                  dataArray={this.state.dataArr}
                  deletePhrase = {this.deletePhrase}
                /> 
                :
                this.state.showReport ?
                <Report dataArray={this.state.dataArr} />
                :
                <>
                {this.state.viewMode ? 
                <ViewMode viewStyle={viewStyle} fileContent={this.state.data} phraseData={this.state.dataArr}/> :
                  <textarea 
                          name="text" 
                          rows="20" 
                          cols="20" 
                          style={viewStyle} 
                          onSelect={this.handleSelect}
                          wrap="soft"
                          readOnly={true}
                          defaultValue={this.state.data}
                  >
                  </textarea>   
                }
                </>
              }
              
            </Sidebar.Pusher>  
          </Container>
          </Sidebar.Pushable>
          </>
        }
      </>
    )
  }
}
