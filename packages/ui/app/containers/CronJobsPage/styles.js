const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
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
  select: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    overflowX:'hidden'
  },
  grid:{
    padding:theme.spacing.unit * 2,
    paddingTop:theme.spacing.unit * 1
  },
  appContainer: {},
  advanceContainer: {},
  actionContainer: {
    textAlign: 'right',
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
  padding10: {
    padding: '10px',
  },
  marginRight10: {
    marginRight: '10px',
  },
  formControl: {
    margin: theme.spacing.unit,
    flexBasis: 200,
    minWidth: 194,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  addContainerWrap: {
    minHeight: '75px',
  },
  addContainerButton: {
    alignSelf: 'center',
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  separateLineWrap: {
    marginTop: '8px',
    marginRight: '5px',
    background: '#eee',
  },
  separateLine: {
    marginTop: '8px',
    boxShadow: '1px 0px 2px #ccc',
    border: '1px solid #ccc',
  },
  removeBtn: {
    float: 'right',
  },
  createBtnLink: {
    position: 'absolute',
    top: '3px',
    right: '10px',
  },
  radioControl: {
    flexDirection: 'row',
  },
  radioLabel: {
    flexDirection: 'row',
    lineHeight: 3,
  },
  radioGroup: {
    flexDirection: 'row',
    marginLeft: '2rem',
  },
});

export default styles;
