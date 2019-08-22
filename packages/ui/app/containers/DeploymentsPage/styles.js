import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  dialogCard: {
    margin: 0,
  },
  dialogHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dialogCardBody: {
    // height: 'calc(100vh - 225px)',
  },
  dialogCardBodyPaper: {
    // height: '100%',
  },
});

export default makeStyles(styles);
