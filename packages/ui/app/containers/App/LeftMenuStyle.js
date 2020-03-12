import { makeStyles } from '@material-ui/styles';
import hexToRgb from '@gsmlg/utils/hexToRgb';

export const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.leftMemu.main,
    color: theme.palette.leftMemu.contrastText,
    ...theme.palette.transition,
    border: 'none',
    zIndex: theme.zIndex.appBar,
    width: ({ showText }) =>
      showText ? theme.leftMenuWidth : theme.leftShrinkWidth,
  },
  secondMenu: {
    width: theme.leftMenuWidth,
    color: theme.palette.leftMemu.contrastText,
    background: theme.palette.leftMemu.main,
    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
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
    color: theme.palette.leftMemu.contrastText,
  },
  itemLink: {
    ...theme.palette.transition,
    width: 'auto',
    color: theme.palette.leftMemu.contrastText,
    borderRadius: '0px',
    position: 'relative',
    padding: '10px 15px',
    backgroundColor: 'transparent',
    height: '50px',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.leftMemu.highlight,
      backgroundColor: 'transparent',
    },
  },
  itemIcon: {
    justifyContent: 'center',
  },
  itemText: {
    display: ({ showText }) => (showText ? 'flex' : 'none'),
    fontSize: 14,
    paddingLeft: 5,
  },
  sidebarWrapper: {
    flex: 1,
    overflow: 'hidden',
    width: ({ showText }) =>
      showText ? theme.leftMenuWidth : theme.leftShrinkWidth,
    zIndex: 4,
    overflowScrolling: 'touch',
    color: theme.palette.leftMemu.contrastText,
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
      backgroundColor: theme.palette.leftMemu.highlight,
    },
  },
  active: {
    color: theme.palette.leftMemu.highlight,
    '&:hover': {
      color: theme.palette.leftMemu.highlight,
      fontWeight: 'bold',
    },
  },
});

export default makeStyles(styles);
