import React from 'react';
import {
  IconButton, Snackbar, SnackbarContent, withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import green from '@material-ui/core/colors/green';

const styles = {
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
};

const Success = ({ classes, onClose, success }) => (
  <Snackbar
    open={!!success}
    onClose={onClose}
    autoHideDuration={6000}
  >
    <SnackbarContent
      className={classes.success}
      aria-describedby="client-snackbar"
      message={success}
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

Success.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  success: PropTypes.string,
};

Success.defaultProps = {
  success: null,
};

export default withStyles(styles)(Success);
