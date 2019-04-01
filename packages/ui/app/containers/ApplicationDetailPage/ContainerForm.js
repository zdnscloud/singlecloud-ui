import React, { Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

export default class ContainerForm extends React.PureComponent {
  state = {
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: findDOMNode(this.InputLabelRef).offsetWidth, // eslint-disable-line
    });
  }

  render() {
    const { classes, configMaps, index, item, updateForm } = this.props;

    return (
      <Fragment>
        <Button
          variant="contained"
          color="secondary"
          className={classNames(classes.margin, classes.button)}
          onClick={(evt) => {
            updateForm(['containers', index], null);
          }}
        >
          remove this
        </Button>
        <TextField
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="container name"
          value={item.get('name')}
          onChange={(evt) =>
            updateForm(['containers', index, 'name'], evt.target.value)
          }
        />
        <TextField
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="container image"
          value={item.get('image')}
          onChange={(evt) =>
            updateForm(['containers', index, 'image'], evt.target.value)
          }
        />
        <TextField
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="command"
          value={item.get('command')}
          onChange={(evt) =>
            updateForm(['containers', index, 'command'], evt.target.value)
          }
        />
        <TextField
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="args"
          value={item.get('args')}
          onChange={(evt) =>
            updateForm(['containers', index, 'args'], evt.target.value)
          }
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={(ref) => {
              this.InputLabelRef = ref;
            }}
            htmlFor="config_name-simple"
          >
            ConfigMap Name
          </InputLabel>
          <Select
            value={item.get('config_name')}
            onChange={(evt) =>
              updateForm(['containers', index, 'config_name'], evt.target.value)
            }
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="ConfigMap Name"
                id="config_name-simple"
              />
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {configMaps.map((conf) => (
              <MenuItem key={conf.get('id')} value={conf.get('id')}>
                {conf.get('name')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="mount_path"
          value={item.get('mount_path')}
          onChange={(evt) =>
            updateForm(['containers', index, 'mount_path'], evt.target.value)
          }
        />
        <GridList cellHeight="auto" cols={1}>
          {item.get('exposedPorts').map((port, idx) => (
            <GridListTile key={idx}>
              <TextField
                className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                label="Name"
                value={port.get('name')}
                onChange={(evt) => {
                  updateForm(
                    ['containers', index, 'exposedPorts', idx, 'name'],
                    evt.target.value
                  );
                }}
              />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor={`exposed-port-protocol-${idx}`}>
                  Protocol
                </InputLabel>
                <Select
                  value={port.get('protocol')}
                  onChange={(evt) =>
                    updateForm(
                      ['containers', index, 'exposedPorts', idx, 'protocol'],
                      evt.target.value
                    )
                  }
                  input={
                    <OutlinedInput
                      labelWidth={this.state.labelWidth}
                      name="ConfigMap Name"
                      id={`exposed-port-protocol-${idx}`}
                    />
                  }
                >
                  <MenuItem value="tcp">TCP</MenuItem>
                  <MenuItem value="udp">UDP</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                type="number"
                label="Port"
                value={port.get('port')}
                onChange={(evt) =>
                  updateForm(
                    ['containers', index, 'exposedPorts', idx, 'port'],
                    Number(evt.target.value)
                  )
                }
              />
              <Button
                variant="contained"
                color="secondary"
                className={classNames(classes.margin, classes.button)}
                onClick={(evt) => {
                  updateForm(['containers', index, 'exposedPorts', idx], null);
                }}
              >
                remove this port
              </Button>
            </GridListTile>
          ))}
          <GridListTile>
            <Button
              variant="contained"
              color="primary"
              className={classNames(classes.margin, classes.button)}
              onClick={() => {
                const { size } = item.get('exposedPorts');
                updateForm(
                  ['containers', index, 'exposedPorts', size, 'protocol'],
                  'tcp'
                );
              }}
            >
              ADD exposed PORT
            </Button>
          </GridListTile>
        </GridList>
      </Fragment>
    );
  }
}
