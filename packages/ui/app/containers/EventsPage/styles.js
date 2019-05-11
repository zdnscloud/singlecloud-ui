const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  button: {
    margin: theme.spacing.unit,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  wrapper: {
    minHeight: 'calc(100vh - 65px)',
  },
  item: {

  },
  itemAvatar: {},
  itemText: {
    paddingRight: 0,
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    textOverflow: 'ellipsis',
  },
  itemText1: {
    display: 'flex',
    flexDirection: 'row',
    width: '223px',
    height: '24px',
  },
  itemText2: {
    display: 'flex',
    flexDirection: 'row',
    width: '223px',
    height: '24px',
  },
  itemName: {
    color: '#40B7E8',
    width: '170px',
    height: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  itemReason: {
    color: '#4A4A4A ',
    alignSelf: 'flex-end',
    width: '53px',
    height: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  itemMessage: {
    color: '#4A4A4A',
    width: '170px',
    height: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  itemTime: {
    color: '#9B9B9B',
    alignSelf: 'flex-end',
    width: '53px',
    height: '24px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default styles;
