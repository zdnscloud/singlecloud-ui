import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    marginTop: 0,
  },
  infoCardHeader: {
    height: 106,
    '& :last-child': {
      '& div': {
        borderRight: 'none',
      },
    },
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
    alignItems: 'center',
    borderRight: '1px solid #E8E8E8',
    '& h3': {
      color: '#000',
      fontSize: 24,
      fontWeight: 'normal',
      lineHeight: '32px',
    },
    '& p': {
      fontSize: 14,
      color: '#838383',
      margin: 0,
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
  },
  cardHeader: {
    marginLeft: '15px !important',
    marginRight: '15px !important',
  },
  cardBody: {
    padding: '0 18px',
  },
  cardTitle: {
    margin: 0,
    fontSize: 16,
  },
  cardTitleValue: {
    float: 'right',
    color: '#838383',
    fontSize: 14,
  },
  cardHeaderLine: {
    justifyContent: 'center',
    borderBottom: '1px #DFE0DF solid',
    padding: '0 !important',
    margin: '0 17px 17px 20px !important',
  },
});

export default makeStyles(styles);
