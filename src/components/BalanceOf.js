import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { utils } from 'web3';

class BalanceOf extends PureComponent {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = { dataKey: null, value: '', error: null };
  }

  queryBalanceOf = (account) => {
    const { ChallengeToken } = this.contracts;
    const dataKey = ChallengeToken.methods.balanceOf.cacheCall(account);
    this.setState({ dataKey });
  };

  handleInputChange = (e) => {
    this.setState({ value: e.target.value, error: null, dataKey: null });
  };

  handleShowBalance = () => {
    const { value } = this.state;
    if (utils.isAddress(value)) {
      this.queryBalanceOf(value);
    } else {
      this.setState({ error: `${value} is not a valid address!` });
    }
  };

  render() {
    const { value, error, dataKey } = this.state;
    const { ChallengeToken } = this.props;

    const balanceOf = ChallengeToken.balanceOf[dataKey];

    return (
      <React.Fragment>
        <div>
          <TextField
            onChange={this.handleInputChange}
            value={value}
            style={{ marginRight: 8 }}
            label="Enter an address"
            error={!!error}
            helperText={error}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleShowBalance}
          >
            Show balance
          </Button>
        </div>
        {balanceOf && (
          <div style={{ marginTop: 8 }}>
            {`The balance of address ${value} is ${balanceOf.value}`}
          </div>
        )}
      </React.Fragment>
    );
  }
}

BalanceOf.propTypes = {
  ChallengeToken: PropTypes.object.isRequired,
};

BalanceOf.contextTypes = {
  drizzle: PropTypes.object,
};

const mapStateToProps = state => ({
  ChallengeToken: state.contracts.ChallengeToken,
});

export default drizzleConnect(BalanceOf, mapStateToProps);
