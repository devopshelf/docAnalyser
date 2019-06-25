import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react';

export default (props) => {
    const selectOption = [
        {key:"12",value:"12px",text:"12px"},
        {key:"13",value:"13px",text:"13px"},
        {key:"14",value:"14px",text:"14px"},
        {key:"16",value:"16px",text:"16px"},
        {key:"17",value:"17px",text:"17px"},
        {key:"18",value:"18px",text:"18px"}
      ]  
  return (
    <Menu secondary>
      {props.visible ? "" : 
      <Menu.Item 
  icon="bars" style={{cursor:"pointer"}} onClick={props.showSideBar}/> }
      {props.showViewer ? 
      <Menu.Menu position="right">
          <Menu.Item
            icon="save"
            style={{
              color:"green"
            }}
            onClick={()=>{
              props.handleSubmit();
            }}
          />
          <Menu.Item
            icon={props.viewMode ? "eye" : "edit"}
            onClick={()=>{
              props.handleViewMode();
            }}
          />
          <Menu.Item
            icon={props.nightMode ? "moon" : "sun"}
            onClick={()=>{
              props.handleNightMode();
            }}
          />
          <Menu.Item>
          <Dropdown placeholder="font size" 
                    options={selectOption} 
                    onChange = {(e,data)=>{ 
                      props.handleSize(data.value) }}/>  
          </Menu.Item>
        </Menu.Menu> : "" }
    </Menu>
  )
}