import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  card: {
    padding: '20px',
    margin: 0,
  },
  appWrap: {
    border: '1px solid #DFE0DF',
    padding: '20px 13px',
    marginBottom: 25,
  },
  aapName: {
    color: '#1B9CCE',
    width: '100%',
    textAlign: 'center',
  },
  appLogo: {
    margin: '0 auto',
    width: 80,
    display: 'block',
    height: 80,
  },
  appDiscribe: {
    color: '#4A4A4A',
    marginBottom: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkitLineClamp': 2,
    '-webkitBoxOrient': 'vertical',
    height: 42,
  },
  appDetailBtn: {
    background: theme.palette.highlight.main,
    color: '#fff',
    width: '100px',
    height: '35px',
    margin: '0 auto',
    display: 'block',
    position: 'relative',
    padding: '6px 16px 6px 12px',
    textAlign: 'center',
    '&,&:hover,&:focus': {
      backgroundColor: theme.palette.highlight.main,
    },
  },
  line: {
    borderBottom: '1px solid #DFE0DF',
    marginTop: 20,
  },
  rightArrowIcon: {
    position: 'absolute',
    right: 0,
    top: 12,
  },
  description: {
    color: '#838383',
    fontSize: 14,
  },
  detailedDesc: {
    margin: 0,
  },
  title: {
    fontSize: 14,
    margin: 0,
    color: '#000',
    flexGrow: 1,
  },
});

export default makeStyles(styles);
