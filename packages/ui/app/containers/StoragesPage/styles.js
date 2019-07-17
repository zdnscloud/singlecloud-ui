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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
    overflowX: 'hidden',
    minHeight: 'calc(100vh - 65px - 82px)',
  },
  grid: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
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
  formLabel: {
    display: 'none',
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default styles;
