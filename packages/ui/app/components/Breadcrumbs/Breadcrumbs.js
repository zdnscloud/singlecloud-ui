import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const style = {
    breadcrumbs: {
      width: "100%",
      padding:6, 
      paddingLeft:16,
      background:"#fff"
    },
    icon: {
        width: 20,
        height: 20,
        verticalAlign:"text-bottom",
        color:"#9B9B9B"
    },
    inherit:{
        color:"#9B9B9B",
        textDecoration:'none'
    },
    textPrimary:{
        color:"#1A435F",
        textDecoration:'none'
    }
  };

function BreadcrumbsContainer({ ...props }) {
    const { classes, children, className, data, ...rest } = props;
    return (
        <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />}  
            className={classes.breadcrumbs} 
        >
          <Link color="inherit" to="/"><HomeIcon className={classes.icon} /></Link> 
          {data.map((prop, key) => {
            return (
               key === data.length-1 ?  
               <Typography 
                  className={classes.textPrimary} 
                >
                  {prop.name}
              </Typography> : 
              <Link 
                className={classes.inherit} 
                to={prop.path}
              >
                {prop.name}
              </Link> 
            )
          })}
        </Breadcrumbs>
      );
}


BreadcrumbsContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    className: PropTypes.string
  };
export default withStyles(style)(BreadcrumbsContainer);