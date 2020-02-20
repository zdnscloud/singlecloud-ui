import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  details: {
    margin: 0,
    fontSize: 14,
    maxWidth: 300,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    verticalAlign: 'middle',
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
});

export default makeStyles(styles);
