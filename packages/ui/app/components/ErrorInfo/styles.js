const customErrorStyle = (theme) => ({
  errorWrap: {
    background: 'rgba(255,241,240,1)',
    borderRadius: '3px',
    border: '1px solid rgba(255,163,158,1)',
    marginBottom: theme.spacing(2),
    paddingLeft: 64,
    position: 'relative',
  },
  errorText: {
    fontSize: 14,
    color: 'rgba(131,131,131,1)',
    marginTop: 5,
  },
  errorTitle: {
    fontSize: 16,
    color: 'rgba(0,0,0,1)',
    marginBottom: 0,
  },
  warningIcon: {
    position: 'absolute',
    left: 31,
    top: 19,
  },
  closeIcon: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
});

export default customErrorStyle;
