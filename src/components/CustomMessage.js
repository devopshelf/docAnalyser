import React from 'react'
import { Message } from 'semantic-ui-react';

export default ({header,content}) => {
  return (
    <Message
        header={header}
        content={content}
    />
  )
}
