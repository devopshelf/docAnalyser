import React from 'react'
import { Menu } from 'semantic-ui-react';

export default (props) => {
  return (
    <Menu>
        <Menu.Item
          name='SAVE'
          onClick={()=>{
            props.handleSubmit()
          }}
        />
        <Menu.Item
          name='GENERATE REPORT'
          onClick={()=>{
            alert("Generating reports")
          }}
        />
      </Menu>
  )
}