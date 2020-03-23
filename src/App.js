import React from 'react';

import Header from './ui/Header';
import { Flex } from 'rebass';

const flexProps = {
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
};

const headerFooter = {
  p: 40,
  bg: '#000',
  color: '#fff'
};

function App(props) {
  return (
    <>
      <Flex as='header' sx={{ ...flexProps, ...headerFooter }}>
        <Header title='Circadiana' bg='tomato' />
      </Flex>
      <Flex as='main' sx={flexProps}>
        <p>Hello there.</p>
      </Flex>
      <Flex as='footer' sx={{ ...flexProps, ...headerFooter }}>
        An AP Joint
      </Flex>
    </>
  );
}

export default App;
