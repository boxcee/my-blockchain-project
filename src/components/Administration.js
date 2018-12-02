import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Button, Input } from '@material-ui/core';
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

    // let drizzle know we want to watch the `myString` method
    const dataKey = Whitelist.methods['owner'].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  addToWhitelist = (account) => {
    if (utils.isAddress(account)) {
      const { Whitelist } = this.contracts;
      const stackId = Whitelist.methods['addToWhitelist'].cacheSend(account, { from: this.props.account });
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
    const { Whitelist } = this.props;

    return (
      <div style={{ marginTop: 4 }}>
        <p>{this.getTxStatus()}</p>
        <Input onChange={this.handleChange} value={this.state.value} />
        <Button onClick={this.addToWhitelist}>Add to whitelist</Button>
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
