import hexToRgb from '@gsmlg/utils/hexToRgb';

const cardIconStyle = (theme) => ({
  cardIcon: {
    '&$primaryCardHeader,&$cyanCardHeader': {
      borderRadius: 3,
      backgroundColor: theme.palette.highlight.minor,
      padding: 15,
    },
  },
  primaryCardHeader: {
    background: `linear-gradient(60deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
  },
  cyanCardHeader: {
    background: `linear-gradient(60deg, ${theme.palette.light.main}, ${theme.palette.light.main})`,
  },
  cyanInverseCardHeader: {
    background: `transparent`,
  },
});

export default cardIconStyle;
