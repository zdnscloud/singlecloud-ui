import { createMuiTheme } from '@material-ui/core/styles';
import hexToRgb from '@gsmlg/utils/hexToRgb';

const theme = createMuiTheme({
  appBarHeight: 65,
  leftMenuWidth: 200,
  leftShrinkWidth: 85,
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    primary: {
      main: '#072C47',
      light: '#072C47',
      minor: '#1B9CCE',
    },
    secondary: {
      main: '#1A435F',
      light: '#1A435F',
      minor: `rgba(${hexToRgb('#1B9CCE')}, 0.2)`,
    },
    highlight: {
      main: '#1B9CCE',
      light: '#40B7E8',
      secondary: '#1B9CCE',
      minor: '#A2A2A2',
      normal: '#404040',
    },
    light: {
      main: '#FFFFFF',
      contrastText: '#000000',
    },
    leftMemu:{
      main: '#FFFFFF',
      highlight: '#40A9FF',
      highlightBg: '#F5F9FF',
      contrastText: '#404040',
    },
    icons: {
      a: '#7ED321',
      b: '#E23939',
      c: '#4A4A4A',
      d: '#6CD6B1',
      e: '#40B7E8',
      f: '#FF7A22',
    },
    text: {
      a: '#000000', // black
      b: '#4A4A4A', // gray
      c: '#ffffff', // white
      d: '#838383',
      e: '#EE827C',
      warning: '#ff9800',
      danger: '#f44336',
      success: '#4caf50',
      info: '#00acc1',
      gray: '#999999',
    },
    defaultFont: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '300',
      lineHeight: '1.5em',
    },
    transition: {
      transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
    MuiInputLabel: {
      shrink: {
        transform: 'translate(0, 1.5px) scale(0.85)',
      },
    },
    MuiInputBase: {
      root: {
        fontSize: '14px',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '12px',
      },
    },
    MuiSelect: {
      selectMenu: {
        height: '1.1875em',
      },
    },
    MuiFormControlLabel: {
      label: {
        fontSize: '14px',
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
      },
    },
  },
});

export default theme;
