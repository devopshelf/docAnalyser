import React from 'react'
import { Menu } from 'semantic-ui-react';

export default (props) => {
  return (
    <Menu>
        <Menu.Item
          name='VIEWER'
          onClick={()=>{
            props.showViewer();
          }}
        />
        <Menu.Item
          name='PHRASE DATA'
          onClick={()=>{
            props.showTable();
          }}
        />
        <Menu.Item
          style={{
            color:"green",
            fontWeight:"bold"
          }}
          name='SAVE'
          onClick={()=>{
            props.handleSubmit()
          }}
        />
        <Menu.Item
          name='GENERATE REPORT'
          onClick={()=>{
            props.showReport();
          }}
        />
      </Menu>
  )
}