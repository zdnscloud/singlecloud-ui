import hexToRgb from '@gsmlg/utils/hexToRgb';

const cardIconStyle = (theme) => ({
  cardIcon: {
    '&$primaryCardHeader,&$cyanCardHeader': {
      borderRadius: '3px',
      backgroundColor: theme.palette.highlight.minor,
      padding: '15px',
      marginTop: '-20px',
      marginRight: '15px',
      float: 'left',
    },
    '&$cyanInverseCardHeader': {
      borderRadius: '3px',
      padding: '15px',
      marginTop: '0px',
      marginRight: '15px',
      float: 'left',
    },
  },
  primaryCardHeader: {
    background: `linear-gradient(60deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
  },
  cyanCardHeader: {
    background: `linear-gradient(60deg, ${theme.palette.text.c}, ${theme.palette.text.c})`,
  },
  cyanInverseCardHeader: {
    background: `transparent`,
  },
});

export default cardIconStyle;
