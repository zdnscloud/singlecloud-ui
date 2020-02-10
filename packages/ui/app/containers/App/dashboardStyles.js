import { makeStyles } from '@material-ui/styles';
import hexToRgb from '@gsmlg/utils/hexToRgb';

export const styles = (theme) => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  mainWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  },
  mainPanel: {
    ...theme.palette.transition,
    display: 'flex',
    flex: '1 1 auto',
    overflowScrolling: 'touch',
    backgroundColor: '#EAEDF2',
    paddingTop: 1,
    height: `calc(100vh - ${theme.appBarHeight}px)`,
  },
  content: {
    ...theme.palette.transition,
    flex: 1,
    overflowScrolling: 'touch',
    overflow: 'auto',
  },
  events: {
    ...theme.palette.transition,
    display: ({ hasEvents }) => (hasEvents ? 'flex' : 'none'),
    width: ({ hasEvents }) => (hasEvents ? 310 : 0),
    overflow: 'auto',
  },
  selectIcon: {
    position: 'absolute',
    top: 13,
    right: 10,
  },
  selectBtn: {
    minWidth: '106px !important',
    border: '1px solid #ccc',
    paddingRight: '40px !important',
    boxShadow: 'none !important',
    height: 40,
    color: '#4A4A4A',
    marginLeft: 12,
  },
  menuItem: {
    minWidth: 106,
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  secondMenu: {
    left: '4px !important',
    zIndex: 1300,
    backgroundColor: '#fff',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
  },
  ItemText: {
    color: '#6A8090',
    '&:hover': {
      color: '#000',
    },
  },
  activeItemText: {
    color: theme.palette.highlight.main,
    '&:hover': {
      color: '#000',
    },
  },
  selectMenu: {
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
  },
  badgeColor: {
    backgroundColor: theme.palette.highlight.main,
  },
});

export default makeStyles(styles);
