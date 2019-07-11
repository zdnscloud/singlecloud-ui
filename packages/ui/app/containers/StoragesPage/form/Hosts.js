import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  reduxForm,
  FormSection,
} from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import AceEditor from 'react-ace';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';
import ChexboxesField from 'components/Field/ChexboxesField';

import messages from '../messages';

const Hosts = ({
  blockDevices,
  classes,
  fields,
  values,
  meta: { error, submitFailed },
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          <Button
            color="secondary"
            onClick={handleClick}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            <FormattedMessage {...messages.formAddStorage} />
            <PlusIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {blockDevices.map((b, i) => (
              <MenuItem
                onClick={() => {
                  handleClose();
                  fields.push(b);
                }}
              >
                {b.get('nodeName')}
              </MenuItem>
            ))}
          </Menu>
        </GridItem>
      </GridContainer>
      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      {fields.map((f, i) => (
        <GridContainer key={i}>
          <GridItem xs={3} sm={3} md={3}>
            <ReadOnlyInput
              labelText={<FormattedMessage {...messages.formName} />}
              name={`${f}.nodeName`}
              fullWidth
              value={values.getIn([i, 'nodeName'])}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3}></GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
              <MinusIcon />
            </IconButton>
          </GridItem>
          <GridItem xs={9} sm={9} md={9}>
            <ChexboxesField
              label={values.getIn([i, 'nodeName'])}
              name={`${f}.blockDevices`}
              options={[]}
            />
          </GridItem>
        </GridContainer>
      ))}
    </Fragment>
  );
};

export default Hosts;
