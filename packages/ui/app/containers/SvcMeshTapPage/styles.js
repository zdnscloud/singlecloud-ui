import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  grid: {
    width: '100%',
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
});

export default makeStyles(styles);
