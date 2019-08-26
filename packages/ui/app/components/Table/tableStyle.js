const tableStyle = (theme) => ({
  warningTableHeader: {
    color: theme.palette.text.warning,
  },
  primaryTableHeader: {
    color: theme.palette.primary.main,
  },
  dangerTableHeader: {
    color: theme.palette.text.danger,
  },
  successTableHeader: {
    color: theme.palette.text.success,
  },
  infoTableHeader: {
    color: theme.palette.text.info,
  },
  grayTableHeader: {
    color: theme.palette.text.gray,
  },
  table: {
    marginBottom: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
  },
  tableHeadCell: {
    color: 'inherit',
    ...theme.palette.defaultFont,
    fontSize: '1em',
  },
  tableCell: {
    ...theme.palette.defaultFont,
    lineHeight: '1.42857143',
    padding: '12px 8px',
    verticalAlign: 'middle',
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
});

export default tableStyle;
