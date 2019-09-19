import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoCardHeader: {
    height: 85,
  },
  infoCardIcon: {
    display: 'flex',
    justifyContent: 'center',
    width: 120,
  },
  infoCardText: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 15,
    '& h3': {
      color: '#000',
      fontSize: 14,
    },
    '& p': {
      color: '#4A4A4A',
      margin: 0,
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
  },
  cardHeader: {
    marginLeft: '15px !important',
    marginRight: '15px !important',
  },
  cardTitleValue: {
    float: 'right',
    color: theme.palette.highlight.light,
  },
  cardHeaderLine: {
    justifyContent: 'center',
    borderBottom: '1px #DFE0DF solid',
  },
});

export default makeStyles(styles);
