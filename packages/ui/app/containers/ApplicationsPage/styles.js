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
    position: 'absolute',
    right: 0,
    top: 6,
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
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  select: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    overflowX: 'hidden',
  },
  grid: {
    padding: theme.spacing(2),
  },
  contentGrid:{
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  appContainer: {},
  advanceContainer: {},
  actionContainer: {
    textAlign: 'right',
  },
  h5: {
    marginBottom: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
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
    margin: theme.spacing(1),
    flexBasis: 200,
    minWidth: 194,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
  card:{
    padding:'20px',
    margin: 0,
  },
  detailedDesc: {
    margin: 0,
  },
  logo: {
    width: 'auto',
    height: 'auto',
  },
  title: {
    fontSize: 14,
    margin: 0,
    color: '#000',
  },
  description: {
    color: '#838383',
    fontSize: 14,
  },
  appWrap: {
    border: '1px solid #DFE0DF',
    padding: 10,
  },
  aapName: {
    color: '#1B9CCE',
    margin: 0,
  },
  appLogo: {
    margin: '0 auto',  
    width: '80%', 
    display: 'block'
  },
  appDeleteBtn: {
    background: '#1B9CCE',
    color: '#fff',
    width: '24px',
    height: '24px',
    display: 'block',
    padding: 0,
    borderRadius: 2,
    position: 'relative',
    marginTop: 10,
  },
  deleteIcon: {
    position: 'absolute',
    left: 4,
    top: 4,
  },
  appDetailBtn: {
    padding:0,
    minWidth:0 
  },
  tag: {
    width: '100%',
    background: 'rgba(27,156,206,0.3)',
    border: '1px solid  #1B9CCE',
    borderRadius: 2,
    textAlign: 'center',
    marginBottom: 0,
    padding: '15px 0'
  },
  tagWrap: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
});

export default styles;
