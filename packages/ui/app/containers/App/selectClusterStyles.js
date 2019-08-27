const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 144,
    marginRight: '2em',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabelRoot: {
    color: theme.palette.light.contrastText,
  },
  select: {
    '&:before': {
      borderBottom: `1px solid ${theme.palette.secondary.contrastText}`,
    },
    '&:after': {
      borderBottom: `2px solid ${theme.palette.light.contrastText}`,
    },
  },
  selectRoot: {
    color: theme.palette.light.contrastText,
  },
  selectIcon: {
    color: theme.palette.light.contrastText,
  },
});

export default styles;
