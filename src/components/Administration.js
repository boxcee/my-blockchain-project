import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { utils } from 'web3';

class Administration extends PureComponent {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = {
      stackId: null,
      value: '',
      dataKey: null
    };
  }

  componentDidMount() {
    const { Whitelist } = this.contracts;
    const dataKey = Whitelist.methods.owner.cacheCall();
    this.setState({ dataKey });
  }

  addToWhitelist = (account) => {
    if (utils.isAddress(account)) {
      const { Whitelist } = this.contracts;
      const stackId = Whitelist.methods.addToWhitelist.cacheSend(account, { from: this.props.account });
      this.setState({ stackId });
    } else {
      this.setState({ error: `${account} it not a valid address!` });
    }
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  getTxStatus = () => {
    const { transactions, transactionStack } = this.props;
    const txHash = transactionStack[this.state.stackId];
    if (!txHash) return null;
    return `Transaction status: ${transactions[txHash].status}`;
  };

  render() {
    const { dataKey } = this.state;
    const { Whitelist, account } = this.props;

    if (!Whitelist.owner[dataKey] || Whitelist.owner[dataKey].value !== account) {
      return null;
    }

    return (
      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <p>{this.getTxStatus()}</p>
        <TextField
          style={{ marginRight: 8, width: 250 }}
          onChange={this.handleChange}
          value={this.state.value}
          label="Enter an address to whitelist"
        />
        <Button variant="contained" color="primary" onClick={this.addToWhitelist}>Add to whitelist</Button>
      </div>
    );
  }
}

Administration.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = state => ({
  ChallengeToken: state.contracts.ChallengeToken,
  Whitelist: state.contracts.Whitelist,
  transactions: state.transactions,
  transactionStack: state.transactionStack,
  account: state.accounts[0]
});

export default drizzleConnect(Administration, mapStateToProps);
