import { makeStyles } from '@material-ui/styles';
import pageStyles from 'jss/page';

export const styles = (theme) => ({
  ...pageStyles(theme),
  formPlusIcon: {
    position: 'absolute',
    left: '24%',
    top: -40,
  },
  table: {
    '& thead tr': {
      whiteSpace: 'nowrap',
      '& :last-child': {
        minWidth: 100,
      },
    },
    '& .MuiChip-label': {
      display: 'initial',
    },
    '& .MuiChip-root': {
      marginBottom: 5,
    },
  },
  listItem: {
    '& .MuiSelect-selectMenu span': {
      width: '100% !important',
    },
  },
});

export default makeStyles(styles);
