import React from 'react'
import { Menu, Sidebar } from 'semantic-ui-react';

export default (props) => {
  return (
    <Sidebar
            as={Menu}
            animation='scale down'
            icon='labeled'
            onHide={props.handleSidebarHide}
            vertical
            visible={props.visible}
            width='thin'
          >
        <Menu.Item
          name='HOME'
          icon="home"
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
          name='REPORTS'
          icon="file alternate"
          onClick={()=>{
            props.showReport();
          }}
        />
      </Sidebar>
  )
}