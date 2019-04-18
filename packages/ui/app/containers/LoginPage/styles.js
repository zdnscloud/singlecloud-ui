import { container } from 'assets/jss/material-kit-react';
import boxImage from 'images/login-bg-box.png';
import image from 'images/login-bg.jpg';
import {
  primaryColor,
  dangerColor,
  successColor,
} from "assets/jss/material-kit-react";

const signupPageStyle = (theme) => ({
  container: {
    ...container,
    zIndex: '2',
    position: 'relative',
    paddingTop: '20vh',
    color: '#FFFFFF',
  },
  pageSecondBg: {
    // zIndex: 0,
    backgroundImage: `url(${boxImage})`,
    backgroundRepeat: 'no-repeat',
    transition: '3s all',
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
    width: 'auto',
    textAlign: 'center',
    marginLeft: '0px',
    marginRight: '0px',
    marginTop: '0px',
    padding: '0px 0',
    marginBottom: '-15px',
    backgroundColor: 'rgb(255,255,255, 0)',
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
    border: '0',
    borderRadius: '6px',
    justifyContent: 'center !important',
    textAlign: 'center',
  },
  inputIconsColor: {
    color: '#fff !important',
  },
  inputIconsError: {
    color: `${dangerColor} !important`,
  },
  inputIconsSuccess: {
    color: `${successColor} !important`,
  },
  input: {
    color: '#eee',
  },
});

export default signupPageStyle;
