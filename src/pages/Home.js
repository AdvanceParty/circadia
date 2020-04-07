import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>Hello</h1>
      <p>
        You probably want to go to the <Link to='/dashboard'>dashboard</Link>.
        But maybe you just want to hang here. It's up to you.
      </p>
    </>
  );
}

export default Home;
