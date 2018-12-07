import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

class MyBalance extends PureComponent {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = { balance: null };
  }

  componentDidMount() {
    const { ChallengeToken } = this.contracts;
    const { account } = this.props;
    const balance = ChallengeToken.methods.balanceOf.cacheCall(account);
    this.setState({ balance });
  }

  render() {
    const { balance } = this.state;
    const { ChallengeToken } = this.props;

    return (
      <Typography variant="h6" color="inherit">
        {`Balance: ${(ChallengeToken.balanceOf[balance] ? ChallengeToken.balanceOf[balance].value : null)} CHT`}
      </Typography>
    );
  }
}

MyBalance.propTypes = {
  ChallengeToken: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired
};

MyBalance.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = state => ({
  ChallengeToken: state.contracts.ChallengeToken,
  account: state.accounts[0]
});

export default drizzleConnect(MyBalance, mapStateToProps);
