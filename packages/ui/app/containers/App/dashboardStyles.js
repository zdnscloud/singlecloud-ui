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
    flex: 1,
    overflowScrolling: 'touch',
    backgroundColor: '#EAEDF2',
    paddingTop: 15,
  },
  content: {
    ...theme.palette.transition,
    flex: 1,
  },
  events: {
    ...theme.palette.transition,
    display: ({ hasEvents }) => hasEvents ? 'flex' : 'none',
    width: ({ hasEvents }) => hasEvents ? 310 : 0,
    overflow: 'auto',
  },
  selectIcon: {
    position: 'absolute',
    top: 13,
    right: 10,
  },
  selectBtn: {
    minWidth: 106,
    border: '1px solid #ccc',
    paddingRight: 40,
    boxShadow: 'none',
    height: 40,
    color: '#4A4A4A'
  },
  menuItem: {
      minWidth: 106,
   },

});

export default makeStyles(styles);
