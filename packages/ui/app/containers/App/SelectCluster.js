import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import messages from './messages';
import styles from './selectClusterStyles';
import * as actions from './actions';
import { makeSelectActiveCluster } from './selectors';
import { makeSelectClusters } from '../ClustersPage/selectors';

const SelectCluster = (props) => {
  const { classes, clusters, activeCluster, changeCluster } = props;

  return (
    <FormControl className={classes.formControl}>
      <Select
        className={classes.select}
        classes={{
          root: classes.selectRoot,
          icon: classes.selectIcon,
        }}
        displayEmpty
        disableUnderline
        value={activeCluster}
        onChange={(evt) => {
          changeCluster(evt.target.value);
        }}
      >
        <MenuItem value="">
          <em>
            <FormattedMessage {...messages.global} />
          </em>
        </MenuItem>
        {clusters.toList().map((c) => (
          <MenuItem key={c.get('id')} value={c.get('id')}>
            {c.get('name')}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectCluster.propTypes = {
  classes: PropTypes.object.isRequired,
  clusters: PropTypes.object.isRequired,
  changeCluster: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClusters(),
  activeCluster: makeSelectActiveCluster(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withStyles(styles))(SelectCluster);
