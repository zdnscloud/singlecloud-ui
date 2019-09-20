import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  indicator: {
    backgroundColor: theme.palette.highlight.secondary,
  },
  cardTitle: {
    color: theme.palette.text.a,
    marginTop: '1em',
    minHeight: 'auto',
    fontWeight: '300',
    marginBottom: '3px',
    textDecoration: 'none',
    textAlign: 'left',
    textIndent: '2em',
    '& small': {
      color: theme.palette.text.a,
      fontWeight: '400',
      lineHeight: '1',
    },
  },
});

export default makeStyles(styles);
