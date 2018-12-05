import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Name from './Name';
import Balance from './BalanceOf';
import Administration from './Administration';
import Transfer from './Transfer';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import Drizzle from './Drizzle';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
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
              <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <Link to="/administration">
                    <Button>Administration</Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/transfer">
                    <Button>Transfer</Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/">
                    <Button>Balance</Button>
                  </Link>
                </MenuItem>
              </Menu>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
