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
    display: ({ hasEvents }) => hasEvents ? 'flex' : 'none',
    width: ({ hasEvents }) => hasEvents ? 310 : 0,
    overflow: 'auto',
  },
});

export default makeStyles(styles);
