import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import homeIcon from 'images/clusters/home.png';

const style = {
  breadcrumbs: {
    padding: 6,
    paddingLeft: 16,
    backgroundColor: '#fff',
  },
  icon: {
    width: 20,
    height: 20,
    verticalAlign: 'text-bottom',
    color: '#9B9B9B',
  },
  inherit: {
    color: '#9B9B9B',
    textDecoration: 'none',
  },
  textPrimary: {
    color: '#1A435F',
    textDecoration: 'none',
  },
};

function BreadcrumbsContainer({ ...props }) {
  const { classes, children, className, data, ...rest } = props;
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      className={classes.breadcrumbs}
    >
      <Link color="inherit" to="/">
        <img src={homeIcon} className={classes.icon} alt="home" />
      </Link>
      {data.map((prop, key) =>
        key === data.length - 1 ? (
          <Typography className={classes.textPrimary} key={key}>
            {prop.name}
          </Typography>
        ) : (
          <Link className={classes.inherit} to={prop.path} key={key}>
            {prop.name}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
}

BreadcrumbsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};
export default withStyles(style)(BreadcrumbsContainer);
