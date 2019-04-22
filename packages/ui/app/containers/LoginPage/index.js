/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { SubmissionError } from 'redux-form';
import { withRouter } from 'react-router';
import sha1 from 'crypto-js/sha1';
import encHex from 'crypto-js/enc-hex';

import withStyles from '@material-ui/core/styles/withStyles';

import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import Footer from 'components/Footer/Footer';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';

import * as roleActions from 'ducks/role/actions';
import { makeSelectIsLogin } from 'ducks/role/selectors';

import styles from './styles';
import messages from './messages';
import LoginPageHelmet from './helmet';
import LoginForm from './LoginForm';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
  static propTypes = {};

  state = {
    cardAnimaton: 'cardHidden',
    px: 380,
    py: 190,
  };

  t = null;

  componentWillMount() {
    const { isLogin, history } = this.props;
    if (isLogin) {
      history.replace('/clusters');
    }
  }

  componentWillUpdate(nextProps) {
    const { isLogin, history } = nextProps;
    if (isLogin) {
      history.replace('/clusters');
    }
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(() => {
      this.setState({ cardAnimaton: 'cardShown' });
    }, 700);
  }

  componentWillUnmount() {
    this.untrackMounse();
  }

  trackMouse(evt) {
    // image w 870 h 515
    const w = window.screen.width;
    const h = window.screen.height;
    const x = Math.abs(evt.screenX) % (w - 870);
    const y = Math.abs(evt.screenY) % (h - 515);
    this.setState({ px: x, py: y }, () => {
      this.untrackMounse();
      this.t = setTimeout(() => this.setState({ px: 380, py: 190 }), 5000);
    });
  }

  untrackMounse() {
    if (this.t) {
      clearTimeout(this.t);
      this.t = null;
    }
  }

  render() {
    const { classes, login, ...rest } = this.props;
    async function submit(formValues) {
      try {
        const password = sha1(formValues.get('password')).toString(encHex);
        const user = formValues.get('username');
        await new Promise((resolve, reject) => {
          login({ user, password }, { resolve, reject });
        });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }
    return (
      <div onMouseMove={(evt) => this.trackMouse(evt)}>
        <LoginPageHelmet />
        <div className={classes.pageHeader}>
          <div
            className={classes.pageSecondBg}
            style={{
              backgroundPosition: `${this.state.px}px ${this.state.py}px`,
            }}
          />
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <LoginForm onSubmit={submit} classes={classes} />
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLogin: makeSelectIsLogin(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...roleActions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withRouter,
  withStyles(styles)
)(LoginPage);
