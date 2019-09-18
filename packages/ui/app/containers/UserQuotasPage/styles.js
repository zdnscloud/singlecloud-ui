import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  cancleBtn: {
    marginLeft: '10px',
  },
  textareaControl: {
    width: '100%',
  },
  username: {
    fontSize: '14px',
    display: 'block',
    marginTop: '20px',
  },
});

export default makeStyles(styles);
