import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  blank: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 200px)',
    flexDirection: 'column',
    '& .MuiSvgIcon-root': {
      width: 96,
      height: 100,
    },
  },
  blankText: {
    fontSize: 14,
    color: '#B4B4B4',
    marginTop: 20,
  },
});

export default makeStyles(styles);
