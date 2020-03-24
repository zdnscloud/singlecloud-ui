const customInputStyle = (theme) => ({
  disabled: {
    '&:before': {
      borderColor: 'transparent !important',
    },
  },
  underline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: '#A2A2A2 !important',
      borderWidth: '1px !important',
    },
    '&:after': {
      borderColor: theme.palette.primary.main,
    },
  },
  underlineError: {
    '&:after': {
      borderColor: theme.palette.text.danger,
    },
  },
  underlineSuccess: {
    '&:after': {
      borderColor: theme.palette.text.success,
    },
  },
  whiteUnderline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: '#FFFFFF',
    },
    '&:after': {
      borderColor: '#FFFFFF',
    },
  },
  labelRoot: {
    ...theme.palette.defaultFont,
    color: '#838383 !important',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '1.42857',
    '& + $underline': {
      marginTop: '0px',
    },
  },
  labelRootError: {
    color: `${theme.palette.text.danger} !important`,
  },
  labelRootSuccess: {
    color: `${theme.palette.text.success} !important`,
  },
  formControl: {
    margin: '0 0 17px 0',
    paddingTop: '16px',
    position: 'relative',
    '& svg,& .fab,& .far,& .fal,& .fas,& .material-icons': {
      color: '#495057',
    },
  },
  input: {
    color: '#495057',
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'inline-block',
    '&,&::placeholder': {
      fontSize: '14px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400',
      lineHeight: '1.42857',
      opacity: '1',
    },
    '&::placeholder': {
      color: '#AAAAAA',
    },
  },
  whiteInput: {
    '&,&::placeholder': {
      color: '#FFFFFF',
      opacity: '1',
    },
  },
  lowerCaseInput: {
    textTransform: 'lowercase',
  },
});

export default customInputStyle;
