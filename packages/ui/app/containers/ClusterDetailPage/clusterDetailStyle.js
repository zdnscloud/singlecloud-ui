import hexToRgb from '@gsmlg/utils/hexToRgb';

const dashboardStyle = (theme) => ({
  cardHeader: {
    marginLeft: '15px !important',
    marginRight: '15px !important',
  },
  cardCategory: {
    color: '#000',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    paddingTop: '20px',
    marginBottom: '0',
    fontWeight: 'bold',
  },
  cardTitle: {
    color: '#4A4A4A',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#4A4A4A',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  cardTitleValue: {
    float: 'right',
    color: theme.palette.highlight.light,
  },
  cardHeaderLine: {
    borderBottom: '1px #DFE0DF solid',
  },
});

export default dashboardStyle;
