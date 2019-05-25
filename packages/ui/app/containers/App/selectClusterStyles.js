const styles = (theme) => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 144,
    marginRight: '2em',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  inputLabelRoot: {
    color: theme.palette.primary.contrastText,
  },
  select: {
    '&:before': {
      borderBottom: `1px solid ${theme.palette.secondary.contrastText}`,
    },
    '&:after': {
      borderBottom: `2px solid ${theme.palette.primary.contrastText}`,
    },
  },
  selectRoot: {
    color: theme.palette.primary.contrastText,
  },
  selectIcon: {
    color: theme.palette.primary.contrastText,
  },
});

export default styles;
