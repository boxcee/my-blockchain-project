import { Menu as MaterialMenu, MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { drizzleConnect } from 'drizzle-react';

class Menu extends PureComponent {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = { owner: null };
  }

  componentDidMount() {
    const { Whitelist } = this.contracts;
    const dataKey = Whitelist.methods.owner.cacheCall();
    this.setState({ owner: dataKey });
  }

  handleClick = path => () => {
    this.props.history.replace(path);
    this.props.onClose();
  };

  render() {
    const { owner } = this.state;
    const {
      anchorEl, onClose, Whitelist, account,
    } = this.props;
    const isAdmin = (Whitelist.owner[owner] && Whitelist.owner[owner].value === account);

    console.log(this.props);

    return (
      <MaterialMenu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={onClose}
      >
        {isAdmin && (
        <MenuItem onClick={this.handleClick('/administration')}>
          Administration
        </MenuItem>
        )}
        <MenuItem onClick={this.handleClick('/transfer')}>
          Transfer
        </MenuItem>
        <MenuItem onClick={this.handleClick('/')}>
          Balance
        </MenuItem>
      </MaterialMenu>
    );
  }
}

Menu.propTypes = {
  history: PropTypes.object.isRequired,
};

Menu.contextTypes = {
  drizzle: PropTypes.object,
};

const mapStateToProps = state => ({
  Whitelist: state.contracts.Whitelist,
  account: state.accounts[0],
});

export default withRouter(drizzleConnect(Menu, mapStateToProps));
