import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, Typography, withStyles,
} from '@material-ui/core';

const styles = {
  toolbar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 976,
    backgroundColor: 'teal',
  },
  main: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 1024,
    boxShadow: '0px 2px 10px 4px rgba(0, 0, 0, 0.2)',
  },
  warning: {
    padding: 16,
  },
};

class Drizzle extends PureComponent {
  render() {
    const {
      drizzleStatus, web3, children, classes,
    } = this.props;

    if (web3.status === 'failed') {
      return (
        <main>
          <h1>
            <span role="img">⚠</span>
            ️
          </h1>
          <p>
            This browser has no connection to the Ethereum network.
            Please use the Chrome/FireFox extension MetaMask,
            or dedicated Ethereum browsers Mist or Parity.
          </p>
        </main>
      );
    }

    if (!drizzleStatus.initialized) {
      return (
        <React.Fragment>
          <AppBar position="static">
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6" color="inherit">Welcome</Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.main}>
            <div className={classes.warning}>
              <Typography>
                Please open MetaMask and allow the connection to this app.
              </Typography>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return children;
  }
}

Drizzle.propTypes = {
  drizzleStatus: PropTypes.object.isRequired,
  web3: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  drizzleStatus: state.drizzleStatus,
  web3: state.web3,
});

export default withStyles(styles)(drizzleConnect(Drizzle, mapStateToProps));
