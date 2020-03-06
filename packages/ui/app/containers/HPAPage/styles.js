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
    '& tbody tr td:last-child .MuiButton-text': {
      borderRight:'1px solid #e9e9e9',
    },
    '& tbody tr td:last-child .MuiButton-text:first-child': {
      paddingLeft: 0,
    },
    '& tbody tr td:last-child .MuiButton-text:last-child': {
      borderRight:'none',
    },
  },
  listItem: {
    '& .MuiSelect-selectMenu span': {
      width: '100% !important',
    },
  },
});

export default makeStyles(styles);
