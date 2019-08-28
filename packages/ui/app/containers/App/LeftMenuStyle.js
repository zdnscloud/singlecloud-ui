import { makeStyles } from '@material-ui/styles';
import hexToRgb from '@gsmlg/utils/hexToRgb';

export const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    ...theme.palette.transition,
    border: 'none',
    zIndex: theme.zIndex.appBar,
    width: ({ showText }) => showText ? theme.leftMenuWidth : theme.leftShrinkWidth,
  },
  secondMenu: {
    width: theme.leftMenuWidth,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    position: 'absolute',
    left: 2,
    '& $itemText': {
      display: 'flex',
    },
  },
  list: {
    marginTop: '0px',
    listStyle: 'none',
    position: 'unset',
  },
  item: {
    position: 'relative',
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
  },
  itemLink: {
    ...theme.palette.transition,
    width: 'auto',
    color: `rgba(${hexToRgb(theme.palette.primary.contrastText)}, 0.7)`,
    borderRadius: '0px',
    position: 'relative',
    padding: '10px 15px',
    backgroundColor: 'transparent',
    height: '50px',
    '&:hover': {
      color: `rgba(${hexToRgb(theme.palette.primary.contrastText)}, 1)`,
      backgroundColor: 'transparent',
    },
  },
  itemIcon: {
    justifyContent: 'center',
  },
  itemText: {
    display: ({ showText }) => showText ? 'flex' : 'none',
    fontSize: 14,
    paddingLeft: 5,
  },
  sidebarWrapper: {
    flex: 1,
    overflow: 'hidden',
    width: ({ showText }) => showText ? theme.leftMenuWidth : theme.leftShrinkWidth,
    zIndex: 4,
    overflowScrolling: 'touch',
    color: theme.palette.primary.contrastText,
    ...theme.palette.transition,
  },
  nested: {
    padding: '10px 15px',
    paddingLeft: '30px',
    height: '50px',
  },
  activeTile: {
    '&:before': {
      position: 'absolute',
      zIndex: 1,
      width: '4px',
      height: '100%',
      display: 'block',
      left: 0,
      top: 0,
      content: '" "',
      backgroundColor: theme.palette.highlight.main,
    },
  },
  active: {
    color: theme.palette.highlight.main,
    '&:hover': {
      color: theme.palette.highlight.main,
      fontWeight: 'bold',
    },
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    width: ({ showText }) => showText ? theme.leftMenuWidth : theme.leftShrinkWidth,
    height: theme.appBarHeight,
    zIndex: 4,
  },
  logoIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.leftShrinkWidth,
    '& img': {
      width: 30,
    },
  },
  logoName: {
    display: ({ showText }) => showText ? 'flex' : 'none',
    flex: 1,
    fontSize: 18,
  },
});

export default makeStyles(styles);
