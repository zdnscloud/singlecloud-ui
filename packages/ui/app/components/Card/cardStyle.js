import hexToRgb from '@gsmlg/utils/hexToRgb';

const cardStyle = (theme) => ({
  card: {
    border: '0',
    marginBottom: '20px',
    marginTop: '20px',
    borderRadius: '6px',
    color: `rgba(${hexToRgb(theme.palette.text.a)}, 0.87)`,
    background: theme.palette.light.main,
    width: '100%',
    // boxShadow: `0 1px 4px 0 rgba(${hexToRgb(theme.palette.text.a)}, 0.14)`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    wordWrap: 'break-word',
    fontSize: '.875rem',
  },
  cardPlain: {
    background: 'transparent',
    boxShadow: 'none',
  },
  cardProfile: {
    marginTop: '30px',
    textAlign: 'center',
  },
  cardChart: {
    '& p': {
      marginTop: '0px',
      paddingTop: '0px',
    },
  },
  cardBorder: {
    border: '1px solid #C1C1C1',
  },
});

export default cardStyle;
