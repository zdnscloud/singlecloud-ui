import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
    overflow: 'auto',
    overflowX: 'hidden',
  },
  card404: {
  },
  card404Body: {
    height: 608,
  },
  img404: {
    position: 'absolute',
    width: 394,
    height: 300,
    top: 154,
    left: 104,
  },
  textBlock: {
    position: 'absolute',
    width: 580,
    top: 199,
    left: 570,
    '& h4': {
      fontSize: 26,
      color: '#262626',
    },
    '& ul': {
      fontSize: 22,
      color: '#62616B',
      paddingLeft: 0,
      '& li': {
        marginTop: 24,
      },
    },
  },
});

export default makeStyles(styles);
