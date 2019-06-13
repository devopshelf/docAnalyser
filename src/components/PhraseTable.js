import React from 'react'
import { Table } from 'semantic-ui-react';

export default (props) => {
const rows = props.dataArr.map((d,key) => {
        if(d.phrase !== ""){
            return(
                <Table.Row key={key}>
                    <Table.Cell>{d.phrase}</Table.Cell>
                    <Table.Cell>{d.time}</Table.Cell>
                </Table.Row>
            )
        }else{
            return ""
        }
})
  return (
    <Table celled>
      <Table.Header>
          <Table.Row>
              <Table.HeaderCell>Phrase</Table.HeaderCell>
              <Table.HeaderCell>Time(sec)</Table.HeaderCell>
          </Table.Row>
          {rows}
      </Table.Header>
    </Table>
  )
}
