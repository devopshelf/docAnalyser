import React, { Component } from 'react'
import { Container } from 'semantic-ui-react';

export default class ViewMode extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       fileContent:this.props.fileContent,
       phraseData: this.props.phraseData,
       highlightedFileData:"" 
    }
  }

  componentDidMount(){
    let clonedFileData = this.state.fileContent;
    if(this.state.phraseData.length > 0){
        this.state.phraseData.forEach((data)=>{
          clonedFileData = clonedFileData.replace(data.phrase,"<mark>"+data.phrase+"</mark>")
        })
    }
    this.setState({
      highlightedData:clonedFileData
    })
  }
  
  render() {
    return (
            <div 
            style={{
              whiteSpace:"pre-wrap",
              height:"80vh",
              fontFamily:"sans-serif",
              margin:0,
              lineHeight:"1.15",
              ...this.props.viewStyle
            }}
            dangerouslySetInnerHTML={{__html:this.state.highlightedData}}></div>
    )
  }
}
