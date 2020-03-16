const styles = (theme) => ({
  menuItem: {
    minWidth: 106,
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  selectMenu: {
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
  },
  moreButton:{
    position: 'relative',
    color: theme.palette.highlight.light,
  },
  chevronBottom:{
    position: 'absolute !important',
    left: '44px  !important',
    top: '6px !important' ,
  },
});

export default styles;
