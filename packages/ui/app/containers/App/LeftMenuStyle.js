import hexToRgb from '@gsmlg/utils/hexToRgb';
const drawerWidth = 232;

const leftMenuStyle = (theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
  },
  drawerPaper: {
    border: 'none',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    zIndex: theme.zIndex.drawer + 1,
    ...theme.palette.transition,
    width: drawerWidth,
  },
  menuShrink: {
    width: '85px !important',
  },
  menuShrinkModal: {
    left: '85px !important',
  },
  secondMenuModal: {
    zIndex: theme.zIndex.drawer,
    ...theme.palette.transition,
  },
  secondMenu: {
    width: '232px',
    height: 'calc(100vh - 64px)',
    backgroundColor: '#345471',
    position: 'absolute',
    left: 2,
  },
  logo: {
    position: 'relative',
    height: '64px',
    zIndex: '4',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',

      height: '1px',
      right: '15px',
      width: 'calc(100% - 30px)',
    },
  },
  logoLinkRTL: {
    textAlign: 'right',
  },
  logoImage: {
    width: '30px',
    display: 'inline-block',
    maxHeight: '30px',
    marginLeft: '10px',
    marginRight: '15px',
  },
  img: {
    width: '35px',
    top: '22px',
    position: 'absolute',
    verticalAlign: 'middle',
    border: '0',
  },
  background: {
    position: 'absolute',
    zIndex: '1',
    height: '100%',
    width: '100%',
    display: 'block',
    top: '0',
    left: '0',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    '&:after': {
      position: 'absolute',
      zIndex: '3',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      background: '#f5f5f5',
      backgroundColor: theme.palette.secondary.main,
      opacity: '.8',
    },
  },
  list: {
    marginTop: '0px',
    paddingLeft: '0',
    paddingTop: '0',
    paddingBottom: '0',
    marginBottom: '0',
    listStyle: 'none',
    position: 'unset',
    zIndex: 10000,
  },
  item: {
    position: 'relative',
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    '&:hover,&:focus,&:visited,&': {
    },
  },
  itemLink: {
    width: 'auto',
    ...theme.palette.transition,
    color: theme.palette.primary.contrastText,
    borderRadius: '0px',
    position: 'relative',
    padding: '10px 15px',
    backgroundColor: 'transparent',
    height: '50px',
  },
  itemIcon: {
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 14,
    paddingLeft: 5,
  },
  'active itemText': {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  itemSecondaryAction: {
    ...theme.palette.transition,
  },
  whiteFont: {
    color: theme.palette.text.c,
  },
  zcloud: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  sidebarWrapper: {
    position: 'absolute',
    height: 'calc(100vh - 64px)',
    overflow: 'hidden',
    width: '232px',
    top: 64,
    left: 0,
    zIndex: '4',
    overflowScrolling: 'touch',
    color: theme.palette.primary.contrastText,
    ...theme.palette.transition,
  },
  nested: {
    padding: '10px 15px',
    paddingLeft: '30px',
    height: '50px',
  },
  activeMenu1: {
    backgroundColor: '#345471',
    '&:hover': {
      backgroundColor: '#345471',
    },
    '&:before': {
      position: 'absolute',
      zIndex: '1',
      width: '4px',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: '" "',
      backgroundColor: '#1B9CCE',
    },
  },
  activeMenu2: {
    backgroundColor: '#1B9CCE',
    '&:hover': {
      backgroundColor: '#1B9CCE',
    },
  },
  logoIcon: {
    position: 'absolute',
    height: 32,
    width: 32,
    left: 26,
    top:18
  },
  logoWrap: {
    display: 'flex',
    height: 65,
    zIndex: '4',
  },
  logoName: {
    color: '#fff',
    fontFamily:'MicrosoftYaHeiUI',
    fontSize: 18,
    position: 'absolute',
    left: 77,
    top:21,
    margin: 0
  },
});

export default leftMenuStyle;
