import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Name from './Name';
import Balance from './BalanceOf';
import Administration from './Administration';
import Transfer from './Transfer';
import Menu from './Menu';
import Drizzle from './Drizzle';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Layout extends PureComponent {
  state = { anchorEl: null };

  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <Router>
        <Drizzle>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleClick}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={this.handleClose} />
              <Name />
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/administration" component={Administration} />
            <Route path="/transfer" component={Transfer} />
            <Route path="/" exact component={Balance} />
          </Switch>
        </Drizzle>
      </Router>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
