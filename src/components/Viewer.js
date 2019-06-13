import React, { Component } from 'react'
import '../css/viewer.component.css';
import ToolBar from './ToolBar';
import PhraseTable from './PhraseTable';

export default class Viewer extends Component {
  state = {
      dataArr:[],
      selected:"",
      timer:0,
      data:`Anim <span style="color:red"> aliquip</span> quis dolor laboris minim consectetur pariatur ex sit fugiat amet nostrud commodo duis. Velit anim veniam cupidatat mollit sint aliqua culpa cupidatat incididunt fugiat mollit aliquip aute. Incididunt dolor eiusmod cillum fugiat fugiat eiusmod consequat amet qui non enim mollit in. Irure in culpa nostrud eiusmod nisi esse anim cupidatat in labore exercitation enim. Reprehenderit mollit proident ea officia.
      Amet labore adipisicing laboris anim reprehenderit esse fugiat elit. Fugiat minim ipsum elit ea ex anim velit non nulla ullamco consequat cupidatat. Enim laborum eu culpa commodo exercitation id quis.Ex cupidatat duis pariatur eu velit aliquip exercitation nostrud dolore dolore. Est reprehenderit dolor ullamco cillum elit laborum exercitation fugiat id. Pariatur et magna enim exercitation laboris magna sit nostrud dolore ad.
      Labore reprehenderit incididunt nulla consectetur minim quis. Ad in deserunt ea dolore pariatur commodo. Ea officia voluptate labore laboris ex nisi pariatur cillum commodo. Ad dolor id est reprehenderit. Sit labore magna cupidatat proident deserunt fugiat aliqua aute quis mollit magna reprehenderit. Nostrud nisi ad sit cillum eiusmod laboris excepteur commodo excepteur eiusmod commodo enim consequat. Labore fugiat fugiat occaecat culpa id velit nostrud duis.
      Ut anim in minim fugiat duis. Laborum occaecat amet cillum anim minim et mollit ea amet in elit. Amet eiusmod exercitation commodo commodo sit et sit.
      `
  }
  handleSelect = (event) =>{
    if(this.state.selected !== event.target.value.substring(event.target.selectionStart, event.target.selectionEnd) && this.state.selected !== ""){
        let endTime = ((new Date().getTime()) - this.state.timer) / 1000;
        let phraseData = {
            time:endTime,
            phrase:this.state.selected
        }
        this.setState({
            dataArr:[...this.state.dataArr,phraseData]
        })
    }
    
    this.setState({
        selected:event.target.value.substring(event.target.selectionStart, event.target.selectionEnd),
        timer: new Date().getTime()
    })
}

  handleSubmit= () => {
      console.log("data is saved",this.state.dataArr);
  }
    


  render() { 
    return (
      <div>
        <ToolBar handleSubmit={this.handleSubmit}/>
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
        <PhraseTable dataArr={this.state.dataArr}/>       
      </div>
    )
  }
}
