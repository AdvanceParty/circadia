import theme from '@rebass/preset';

const appGrid = {
  display: 'grid',
  minHeight: '100vh',
  gridTemplateRows: 'auto 1fr auto'
};

const flexProps = {
  // alignItems: 'center',
  // justifyContent: 'center',
  // flexDirection: 'column'
};

const headerFooter = {
  p: '1em .25em',
  bg: '#000',
  color: '#fff'
};

const authedUser = {
  display: 'grid',
  gridColumnGap: '.5em',
  alignItems: 'center',
  fontSize: 1,
  gridTemplateColumns: 'auto 1fr'
};

const pageHeader = {
  // ...headerFooter,
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  width: '100%',
  ' .active': {
    color: 'green'
  }
};

export default theme;
export { appGrid, flexProps, headerFooter, pageHeader, authedUser };
