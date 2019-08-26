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
    zIndex: '1',
    ...theme.palette.transition,
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'fixed',
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
      position: 'fixed',
      display: 'block',
      top: '0',
      height: '100vh',
      right: '0',
      left: 'auto',
      zIndex: '1032',
      visibility: 'visible',
      overflowY: 'visible',
      borderTop: 'none',
      textAlign: 'left',
      paddingRight: '0px',
      paddingLeft: '0',
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...theme.palette.transition,
    },
  },
  drawerPaperRTL: {
    [theme.breakpoints.up('md')]: {
      left: 'auto !important',
      right: '0 !important',
    },
    [theme.breakpoints.down('sm')]: {
      left: '0  !important',
      right: 'auto !important',
    },
  },
  menuShrink: {
    width: '60px !important',
  },
  menuShrinkModal: {
    left: '60px !important',
  },
  secondMenuModal: {
    zIndex: theme.zIndex.drawer,
    ...theme.palette.transition,
  },
  secondMenu: {
    width: '232px',
    height: 'calc(100vh - 64px)',
    backgroundColor: '#345471',
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
  },
  item: {
    position: 'relative',
    textDecoration: 'none',
    '&:hover,&:focus,&:visited,&': {
    },
  },
  itemLink: {
    width: 'auto',
    ...theme.palette.transition,
    borderRadius: '0px',
    position: 'relative',
    padding: '10px 15px',
    backgroundColor: 'transparent',
    height: '50px',
  },
  itemIcon: {
    width: '24px',
    height: '30px',
    fontSize: '24px',
    lineHeight: '30px',
    float: 'left',
    marginRight: '15px',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: `rgba(${hexToRgb(theme.palette.text.c)}, 0.8)`,
  },
  itemIconRTL: {
    marginRight: '3px',
    marginLeft: '15px',
    float: 'right',
  },
  itemText: {
    fontSize: '14px',
    color: theme.palette.secondary.contrastText,
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
});

export default leftMenuStyle;
