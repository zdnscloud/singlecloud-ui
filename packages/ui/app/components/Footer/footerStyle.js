const footerStyle = (theme) => ({
  left: {
    float: 'left !important',
    display: 'block',
  },
  right: {
    padding: '15px 0',
    margin: '0',
    fontSize: '14px',
    float: 'right !important',
  },
  footer: {
    overflow: 'hidden',
    bottom: '0',
    borderTop: `1px solid ${theme.palette.highlight.minor}`,
    padding: '15px 0',
    ...theme.palette.defaultFont,
  },
  a: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    backgroundColor: 'transparent',
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0',
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0px',
    width: 'auto',
  },
});
export default footerStyle;
