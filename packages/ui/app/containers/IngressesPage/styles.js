import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  plusIcon: {
    position: 'absolute',
    left: 265,
    top:-33,
  },
  table: {
    marginTop: 30
  }
});

export default makeStyles(styles);
