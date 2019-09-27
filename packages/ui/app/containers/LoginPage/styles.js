import { makeStyles } from '@material-ui/styles';

import boxImage from 'images/login-bg-box.png';
import image from 'images/login-bg.jpg';

const styles = (theme) => ({
  container: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
    '@media (min-width: 576px)': {
      maxWidth: '540px',
    },
    '@media (min-width: 768px)': {
      maxWidth: '720px',
    },
    '@media (min-width: 992px)': {
      maxWidth: '960px',
    },
    '@media (min-width: 1200px)': {
      maxWidth: '1140px',
    },
    zIndex: '2',
    position: 'relative',
    paddingTop: '20vh',
    color: '#FFFFFF',
  },
  pageSecondBg: {
    // zIndex: 0,
    backgroundImage: `url(${boxImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '380px 190px',
    transition: '10s all',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  cardHidden: {
    transition: 'transform 600ms',
    opacity: 0,
    transform: 'translate3d(0, -60px, 0)',
  },
  cardShown: {
    transition: 'transform 600ms',
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    backgroundColor: 'rgb(21,51,77, 0.8)',
  },
  pageHeader: {
    minHeight: '100vh',
    height: 'auto',
    display: 'inherit',
    position: 'relative',
    margin: '0',
    padding: '0',
    border: '0',
    alignItems: 'center',
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    // zIndex: -1,
    '&:before': {
      // background: 'rgba(0, 0, 0, 0)',
    },
    '&:before,&:after': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: '""',
    },
    '& footer li a,& footer li a:hover,& footer li a:active': {
      color: '#FFFFFF',
    },
    '& footer': {
      position: 'absolute',
      bottom: '0',
      width: '100%',
    },
  },
  form: {
    margin: '0',
  },
  cardHeader: {
    paddingBottom: 0,
    height: 124,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  socialIcons: {
    maxWidth: '24px',
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px',
  },
  divider: {
    marginTop: '30px',
    marginBottom: '0px',
    textAlign: 'center',
  },
  cardFooter: {
    paddingTop: '0rem',
    paddingBottom: '1rem',
    border: '0',
    borderRadius: '6px',
    justifyContent: 'center !important',
    textAlign: 'center',
  },
  inputIconsColor: {
    color: '#fff !important',
    transform: 'scale(0.7)',
  },
  inputIconsError: {
    color: `#f44336 !important`,
  },
  inputIconsSuccess: {
    color: `#4caf50 !important`,
  },
  inputIconUp: {
    transform: 'translate(0, -2px) scale(0.7)',
  },
  input: {
    color: '#eee',
  },
  inputUnderline: {
    '&:after': {
      borderColor: '#4f6e87',
    },
  },
  submitButton: {
    backgroundColor: '#1B9CCE !important',
    padding: '0.7em 0',
  },
});

export default makeStyles(styles);
