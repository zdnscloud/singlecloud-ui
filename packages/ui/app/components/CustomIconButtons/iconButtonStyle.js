const iconButtonStyle = (theme) => ({
  disabled: {
    opacity: '0.65',
    pointerEvents: 'none',
  },
  block: {
    width: '100% !important',
  },
  medium: {
    padding: '15px',
  },
  small: {
    padding: '12px',
  },
  iconButton: {
    textAlign: 'center',
    flex: '0 0 auto',
    paddingLeft: 0,
    borderRadius: '50%',
    overflow: 'visible',
    '&:hover,&:focus': {
      backgroundColor: 'transparent',
    },
  },
});

export default iconButtonStyle;
