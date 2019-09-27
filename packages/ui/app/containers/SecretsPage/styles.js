import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  dataList: {
    width: '800px',
  },
  dataListKey: {
    width: '300px',
  },
  dataListValue: {
    width: '300px',
  },
  fileContentButton: {
    display: 'inline-block',
    height: '79px',
    paddingTop: '29px',
  },
  dialogCard: {
    marginTop: 0,
  },
  fileNameLink: {
    color: theme.palette.highlight.main,
    cursor: 'pointer',
  },
});

export default makeStyles(styles);
