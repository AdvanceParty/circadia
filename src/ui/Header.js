import React from 'react';
import { Box, Heading } from 'rebass';

function Header(props) {
  return <Heading as='h1'>{props.title}</Heading>;
}

export default Header;
