import React from 'react';
import {
  IconButton, Snackbar, SnackbarContent, withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
});

const Error = ({ classes, onClose, error }) => (
  <Snackbar
    open={!!error}
    onClose={onClose}
  >
    <SnackbarContent
      className={classes.error}
      aria-describedby="client-snackbar"
      message={error}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />
  </Snackbar>
);

Error.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.string,
};

Error.defaultProps = {
  error: null,
};

export default withStyles(styles)(Error);
