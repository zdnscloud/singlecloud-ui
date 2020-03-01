import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  serviceConfig:{
    marginRight:10,
    marginTop: 10,
    display: 'inline-block',
  },
  radioWrap:{
    paddingTop:10,
  },
});

export default makeStyles(styles);
