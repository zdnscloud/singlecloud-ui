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
    flexGrow: 1,
  },
  description: {
    color: '#838383',
    fontSize: 14,
  },
  appWrap: {
    border: '1px solid #DFE0DF',
    padding: 10,
    marginBottom: 25,
    display: 'flex',
  },
  aapName: {
    margin: 0,
    fontSize: 14,
  },
  appLogo: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  listAppLogo: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  appContent: {
    flex: 1,
    position: 'relative',
  },
  count: {
    position: 'relative',
    marginTop: 10,
  },
  deleteIcon: {
    position: 'absolute',
    right: 4,
    top: 1,
    cursor: 'pointer',
  },
  appDetailBtn: {
    padding: 0,
    minWidth: 0,
  },
  tag: {
    width: '100%',
    background: 'rgba(27,156,206,0.15)',
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
  status: {
    width: 55,
    height: 18,
    borderRadius: 3,
    textAlign: 'center',
    fontSize: 10,
    display: 'inline-block',
    position: 'absolute',
    right: 0,
    top: 6,
  },
});

export default makeStyles(styles);
