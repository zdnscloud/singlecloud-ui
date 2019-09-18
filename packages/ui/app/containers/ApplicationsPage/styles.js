import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  card: {
    padding: '20px',
    margin: 0,
  },
  detailedDesc: {
    margin: 0,
  },
  logo: {
    width: 'auto',
    height: 'auto',
  },
  title: {
    fontSize: 14,
    margin: 0,
    color: '#000',
  },
  description: {
    color: '#838383',
    fontSize: 14,
  },
  appWrap: {
    border: '1px solid #DFE0DF',
    padding: 10,
    marginBottom: 25,
  },
  aapName: {
    color: '#1B9CCE',
    margin: 0,
  },
  appLogo: {
    margin: '0 auto',
    display: 'inline-block',
    width: 80,
    height: 80,
    verticalAlign: 'middle',
    marginRight: 20,
  },
  appContent: {
    display: 'inline-block',
  },
  appDeleteBtn: {
    background: '#1B9CCE',
    color: '#fff',
    width: '24px',
    height: '24px',
    display: 'block',
    padding: 0,
    borderRadius: 2,
    position: 'relative',
    marginTop: 10,
  },
  deleteIcon: {
    position: 'absolute',
    left: 4,
    top: 4,
  },
  appDetailBtn: {
    padding: 0,
    minWidth: 0,
  },
  tag: {
    width: '100%',
    background: 'rgba(27,156,206,0.3)',
    border: '1px solid  #1B9CCE',
    borderRadius: 2,
    textAlign: 'center',
    marginBottom: 0,
    padding: '15px 0',
  },
  tagWrap: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  singleField: {
    margin: '6px 0',
  },
  radioControl: {
    flexDirection: 'row',
    margin: '4px 0',
  },
  radioLabel: {
    flexDirection: 'row',
    lineHeight: '3.5 !important',
  },
  radioGroup: {
    flexDirection: 'row !important',
    marginLeft: '2rem',
  },
  chexboxesControl: {
    flexDirection: 'row',
  },
  chexboxesLabel: {
    flexDirection: 'row',
    lineHeight: 3,
  },
  chexboxesGroup: {
    width: 600,
    flexDirection: 'row',
    marginLeft: '0.8rem',
  },
  cancleBtn: {
    marginLeft: '10px',
  },
});

export default makeStyles(styles);
