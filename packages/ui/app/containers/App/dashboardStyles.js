import {
  drawerWidth,
  transition,
  container,
} from 'assets/jss/material-dashboard-react';

const appStyle = (theme) => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
    overflow: 'hidden',
  },
  mainPanelShrink: {
    width: 'calc(100% - 60px) !important',
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
    marginTop: '65px',
  },
  content: {
    minHeight: 'calc(100vh - 123px)',
    // padding: '5px',
  },
  container,
  map: {},
  eventPage: {
    position: 'fixed',
    top: '65px',
    right: 0,
    zIndex: theme.zIndex.drawer,
    height: 'calc(100vh - 65px)',
    width: '310px',
    overflow: 'auto',
    backgroundColor: '#fff',
  },
});

export default appStyle;
