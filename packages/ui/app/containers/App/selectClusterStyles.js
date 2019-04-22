const styles = (theme) => ({
  formControl: {
    margin: theme.spacing.unit,
    flexBasis: 200,
    minWidth: 194,
    marginRight: '2em',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  inputLabel: {
    root: {
      color: theme.palette.primary.contrastText,
    },
  },
  select: {
    root: {
      color: theme.palette.primary.contrastText,
    },
    icon: {
      color: theme.palette.primary.contrastText,
    },
  },
});

export default styles;
