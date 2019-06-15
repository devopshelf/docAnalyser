import React from 'react'
import { Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Header as='h3' block>
        <Image style={{height:"40px",width:"40px",marginRight:"5px"}} src="https://banner2.kisspng.com/20180812/zjv/kisspng-doc-computer-icons-portable-network-graphics-compu-ico-doc-svg-png-icon-free-download-397267-onl-5b6ff4c1aad214.1364581815340638096997.jpg"/>
        <Link to="/">Docs Analyser</Link>
    </Header>
  )
}
