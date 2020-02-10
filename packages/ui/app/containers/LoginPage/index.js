/**
 *
 * LoginPage
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { SubmissionError } from 'redux-form';
import sha1 from 'crypto-js/sha1';
import encHex from 'crypto-js/enc-hex';
import _ from 'lodash';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import Helmet from 'components/Helmet/Helmet';

import * as roleActions from 'ducks/role/actions';
import { makeSelectIsLogin } from 'ducks/role/selectors';

import useStyles from './styles';
import messages from './messages';
import LoginForm from './LoginForm';

const throttle = _.throttle((cb) => cb(), 500);

export const LoginPage = ({ isLogin, loadRole, login }) => {
  const classes = useStyles();
  const [pos, setPos] = useState({ x: 380, y: 190 });
  useEffect(() => {
    if (!isLogin) {
      loadRole('/web/role');
    }
  }, [isLogin, loadRole]);
  useEffect(() => {
    const { x, y } = pos;
    const t = setTimeout(() => setPos({ x: 380, y: 190 }), 10000);
    return () => clearTimeout(t);
  }, [pos]);
  const trackMouse = useCallback(({ screenX, screenY }) => {
    const { width, height } = window.screen;
    const x = Math.abs(screenX) % (width - 870);
    const y = Math.abs(screenY) % (height - 515);
    throttle(() => setPos({ x, y }));
  }, []);
  async function submit(formValues) {
    try {
      const password = sha1(formValues.get('password')).toString(encHex);
      const name = formValues.get('username');
      await new Promise((resolve, reject) => {
        login({ name, password }, { resolve, reject });
      });
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div onMouseMove={trackMouse}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <div className={classes.pageHeader}>
        <div
          className={classes.pageSecondBg}
          style={{
            backgroundPosition: `${pos.x}px ${pos.y}px`,
          }}
        />
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes.cardShown}>
                <LoginForm onSubmit={submit} classes={classes} />
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginPage);
