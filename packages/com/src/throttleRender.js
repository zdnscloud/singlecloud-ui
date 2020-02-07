/**
 *
 * throttleRender
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle, isEqual } from 'lodash';

export const throttleRender = (View, throttleTime = 100) => {

  class ThrottleView extends React.Component {

    timer = null;
    shouldUpdate = false;

    state = { count: 0 };

    shouldComponentUpdate(nextProps) {
      if (!this.timer) {
        return true;
      }
      this.shouldUpdate = true;
      return false;
    }

    componentDidUpdate() {
      if (this.shouldUpdate === true) {
        this.timer = setTimeout(() => {
          this.timer = null;
          this.setState((sts) => ({ count: sts.count + 1 }));
        }, throttleTime);
        this.shouldUpdate = false;
      }
      this.shouldUpdate = false;
    }

    render() {
      return <View {...this.props} />;
    }
  }

  return (props) => <ThrottleView {...props} />;
};


export default throttleRender;
