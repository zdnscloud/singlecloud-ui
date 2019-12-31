import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import typographyStyle from './typographyStyle';

function Quote({ ...props }) {
  const { classes, text, author, ...rest } = props;
  return (
    <blockquote
      {...rest}
      className={`${classes.defaultFontStyle} ${classes.quote}`}
    >
      <p className={classes.quoteText}>{text}</p>
      <small className={classes.quoteAuthor}>{author}</small>
    </blockquote>
  );
}

Quote.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.node,
  author: PropTypes.node,
};

export default withStyles(typographyStyle)(Quote);
