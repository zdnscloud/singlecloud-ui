import {
  transition,
  boxShadow,
  defaultFont,
  primaryColor,
  primaryBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb,
} from 'assets/jss/material-dashboard-react';

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
    zIndex: 10000,
    ...transition,
    // ...boxShadow,
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'fixed',
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
      // ...boxShadow,
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
      ...transition,
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
    width: '85px !important',
  },
  menuShrinkModal: {
    left: '85px !important',
  },
  secondMenuModal: {
    // top: 64,
    // left: '232px',
    zIndex: theme.zIndex.drawer,
    ...transition,
  },
  secondMenu: {
    width: '232px',
    height: 'calc(100vh - 64px)',
    backgroundColor: '#345471',
    position: 'absolute',
    left: 2
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
      backgroundColor: `rgba(${hexToRgb(grayColor[6])}, 0.3)`,
    },
  },
  logoLink: {
    ...defaultFont,
    textTransform: 'uppercase',
    padding: '5px 0',
    display: 'block',
    fontSize: '18px',
    textAlign: 'left',
    fontWeight: '400',
    lineHeight: '30px',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    '&,&:hover': {
      color: blackColor,
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
    '&:hover,&:focus,&:visited,&': {
      color: blackColor,
    },
  },
  itemLink: {
    width: 'auto',
    ...transition,
    borderRadius: '0px',
    position: 'relative',
    padding: '10px 15px',
    backgroundColor: 'transparent',
    height: '50px',
    ...defaultFont,
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
    color: `rgba(${hexToRgb(whiteColor)}, 0.8)`,
  },
  itemIconRTL: {
    marginRight: '3px',
    marginLeft: '15px',
    float: 'right',
  },
  itemText: {
    ...defaultFont,
    fontSize: '14px',
    color: theme.palette.secondary.contrastText,
    paddingLeft: 5,
    color: '#6A8090',
    '&:hover': {
      color: '#fff',
    }
  },
  'active itemText': {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  itemSecondaryAction: {
    ...transition,
  },
  whiteFont: {
    color: whiteColor,
  },
  zcloud: {
    backgroundColor: theme.palette.secondary.main,
    ...primaryBoxShadow,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      ...primaryBoxShadow,
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
    ...transition,
  },
  nested: {
    padding: '10px 15px',
    paddingLeft: '30px',
    height: '50px',
  },
  activeMenu1: {
    backgroundColor: '#345471',
    // boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
    //   theme.palette.primary.main
    // )},.28), 0 4px 20px 0 rgba(${hexToRgb(
    //   blackColor
    // )},.12), 0 7px 8px -5px rgba(${hexToRgb(theme.palette.primary.main)},.2)`,
    '&:hover': {
      backgroundColor: '#345471',
      // boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
      //   theme.palette.primary.main
      // )},.28), 0 4px 20px 0 rgba(${hexToRgb(
      //   blackColor
      // )},.12), 0 7px 8px -5px rgba(${hexToRgb(theme.palette.primary.main)},.2)`,
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
    // boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
    //   '#1B9CCE'
    // )},.28), 0 4px 20px 0 rgba(${hexToRgb(
    //   blackColor
    // )},.12), 0 7px 8px -5px rgba(${hexToRgb('#1B9CCE')},.2)`,
    '&:hover': {
      backgroundColor: '#1B9CCE',
      // boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
      //   '#1B9CCE'
      // )},.28), 0 4px 20px 0 rgba(${hexToRgb(
      //   blackColor
      // )},.12), 0 7px 8px -5px rgba(${hexToRgb('#1B9CCE')},.2)`,
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
  itemIcon: {
    display: 'block',
    textAlign: 'center'
  },
  propIcon: {
    width: 20,
    height: 20,
    verticalAlign: 'text-bottom',
    color: '#6A8090',
    '&:hover': {
      color: '#fff',
    },
  }
});

export default leftMenuStyle;
