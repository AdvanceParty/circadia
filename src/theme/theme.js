import theme from '@rebass/preset';

const appGrid = {
  display: 'grid',
  minHeight: '100vh',
  gridTemplateRows: 'auto 1fr auto'
};

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

export default theme;
export { appGrid, flexProps, headerFooter };
