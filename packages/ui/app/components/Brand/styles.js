import {
  drawerWidth,
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

const sidebarStyle = (theme) => ({
  logo: {
    display: 'inline-block',
    width: '260px',
    position: 'relative',
    padding: '15px 15px',
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
  whiteFont: {
    color: whiteColor,
  },
  purple: {
    backgroundColor: primaryColor[0],
    ...primaryBoxShadow,
    '&:hover': {
      backgroundColor: primaryColor[0],
      ...primaryBoxShadow,
    },
  },
  blue: {
    backgroundColor: infoColor[0],
    boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
      infoColor[0]
    )},.28), 0 4px 20px 0 rgba(${hexToRgb(
      blackColor
    )},.12), 0 7px 8px -5px rgba(${hexToRgb(infoColor[0])},.2)`,
    '&:hover': {
      backgroundColor: infoColor[0],
      boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
        hexToRgb(infoColor[0])
      )},.28), 0 4px 20px 0 rgba(${hexToRgb(
        hexToRgb(blackColor)
      )},.12), 0 7px 8px -5px rgba(${hexToRgb(infoColor[0])},.2)`,
    },
  },
  green: {
    backgroundColor: successColor[0],
    boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
      successColor[0]
    )},.28), 0 4px 20px 0 rgba(${hexToRgb(
      blackColor
    )},.12), 0 7px 8px -5px rgba(${hexToRgb(successColor[0])},.2)`,
    '&:hover': {
      backgroundColor: successColor[0],
      boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
        hexToRgb(successColor[0])
      )},.28), 0 4px 20px 0 rgba(${hexToRgb(
        hexToRgb(blackColor)
      )},.12), 0 7px 8px -5px rgba(${hexToRgb(successColor[0])},.2)`,
    },
  },
  orange: {
    backgroundColor: warningColor[0],
    boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
      warningColor[0]
    )},.28), 0 4px 20px 0 rgba(${hexToRgb(
      blackColor
    )},.12), 0 7px 8px -5px rgba(${hexToRgb(warningColor[0])},.2)`,
    '&:hover': {
      backgroundColor: warningColor[0],
      boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
        hexToRgb(warningColor[0])
      )},.28), 0 4px 20px 0 rgba(${hexToRgb(
        hexToRgb(blackColor)
      )},.12), 0 7px 8px -5px rgba(${hexToRgb(warningColor[0])},.2)`,
    },
  },
  red: {
    backgroundColor: dangerColor[0],
    boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
      dangerColor[0]
    )},.28), 0 4px 20px 0 rgba(${hexToRgb(
      blackColor
    )},.12), 0 7px 8px -5px rgba(${hexToRgb(dangerColor[0])},.2)`,
    '&:hover': {
      backgroundColor: dangerColor[0],
      boxShadow: `0 12px 20px -10px rgba(${hexToRgb(
        hexToRgb(dangerColor[0])
      )},.28), 0 4px 20px 0 rgba(${hexToRgb(
        hexToRgb(blackColor)
      )},.12), 0 7px 8px -5px rgba(${hexToRgb(dangerColor[0])},.2)`,
    },
  },
  sidebarWrapper: {
    position: 'relative',
    height: 'calc(100vh - 75px)',
    overflow: 'auto',
    width: '260px',
    zIndex: '4',
    overflowScrolling: 'touch',
  },
  activePro: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      width: '100%',
      bottom: '13px',
    },
  },
});

export default sidebarStyle;
