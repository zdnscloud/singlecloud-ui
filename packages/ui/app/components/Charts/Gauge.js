import React, { PureComponent } from 'react';
import Gauge from 'react-svg-gauge';

export default class GuageChart extends PureComponent {
  static defaultProps = {
    label: '',
    value: 0,
  };

  render() {
    const props = this.props
    return (
      <div>
				<Gauge
          {...props}
        />
			</div>
    );
  }
}
