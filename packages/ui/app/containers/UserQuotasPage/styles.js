import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  username: {
    fontSize: '14px',
    display: 'block',
    marginTop: '20px',
  },
  detailsBtn: {
    marginRight: 10,
  },
});

export default makeStyles(styles);
