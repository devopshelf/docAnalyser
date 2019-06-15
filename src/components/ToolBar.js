import React from 'react'
import { Menu } from 'semantic-ui-react';

export default (props) => {
  return (
    <Menu>
        <Menu.Item
          name='VIEWER'
          icon="eye"
          onClick={()=>{
            props.showViewer();
          }}
        />
        <Menu.Item
          name='PHRASE DATA'
          icon="filter"
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
          icon="save"
          onClick={()=>{
            props.handleSubmit()
          }}
        />
        <Menu.Item
          name='GET REPORT'
          icon="file alternate"
          onClick={()=>{
            props.showReport();
          }}
        />
      </Menu>
  )
}