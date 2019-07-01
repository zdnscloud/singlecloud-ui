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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
    overflowX:'hidden',
    minHeight: 'calc(100vh - 65px - 82px)',
  },
  grid:{
    padding:theme.spacing(2),
    paddingTop:theme.spacing(1)
  },
  chartContainer: {},
  h5: {
    marginBottom: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    flexBasis: 200,
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
  text: {
    color: '#000',
  },
  indicator: {
    backgroundColor: theme.palette.highlight.secondary,
  },
  node: {
    display: 'flex',
  },
  nodeChart: {
    width: '50%',
  },
  nodeInfo: {
    width: '50%',
  },
  nodeInfoLine: {
    whiteSpace: 'nowrap',
  },
  nodeInfoLineLabel: {
    float: 'left',
    width: '50%',
  },
  nodeInfoLineValue: {
    float: 'left',
    width: '50%',
  },
  podNode: {
    width: '100%',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  },
  c0: {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    backgroundColor: theme.palette.icons.e,
  },
  c1: {
    display: 'inline-block',
    width: '15%',
    marginLeft: '1.5%',
  },
  c2: {
    display: 'inline-block',
    width: '15%',
    marginLeft: '1.5%',
  },
  c3: {
    display: 'inline-block',
    width: '15%',
    marginLeft: '1.5%',
  },
  c4: {
    display: 'inline-block',
    width: '15%',
    marginLeft: '1.5%',
  },
  c5: {
    display: 'inline-block',
    width: '15%',
    marginLeft: '1.5%',
  },
  ipbox: {
    display: 'flex',
    width: '768px',
    minWidth: '768px',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ipitem: {
    cursor: 'pointer',
    boxSizing: 'border-box',
    width: '16px',
    height: '16px',
    border: '1px solid #C1C1C1',
    margin: '4px',
    borderRadius: '3px',
    '&.active': {
      backgroundColor: theme.palette.icons.e,
    },
  },
  infobox: {
    width: '228px',
    minWidth: '228px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px #eeeeee solid',
    padding: '20px',
    margin: '0 20px',
  },
  infoExample: {
    width: '100%',
    height: '45%',
    borderBottom: '1px #eeeeee solid',
  },
  activeIP: {
    width: '100%',
    paddingTop: '10px',
  },
  infoLine: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    whiteSpace: 'nowrap',
  },
});

export default styles;
