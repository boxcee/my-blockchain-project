import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { utils } from 'web3';

class Transfer extends PureComponent {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey: null, value: '', error: null, address: '',
    };
  }

  getTransferStatus = () => {
    const { stackId } = this.state;
    const { transactions, transactionStack } = this.props;
    const txHash = transactionStack[stackId];
    if (!txHash) return null;
    return `Transaction status: ${transactions[txHash].status}`;
  };

  handleTransfer = () => {
    const { address, value } = this.state;
    const { account } = this.props;
    if (utils.isAddress(address)) {
      const { ChallengeToken } = this.contracts;
      const stackId = ChallengeToken
        .methods
        .transfer
        .cacheSend(address, value, { from: account });
      this.setState({ stackId });
    } else {
      this.setState({ error: `${address} is not a valid address!` });
    }
  };

  handleAddressChange = (e) => {
    this.setState({ address: e.target.value });
  };

  handleValueChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value, error, address } = this.state;

    return (
      <React.Fragment>
        {this.getTransferStatus()}
        <div>
          <TextField
            onChange={this.handleAddressChange}
            value={address}
            style={{ marginRight: 8 }}
            label="Recipient address"
            error={!!error}
            helperText={error}
          />
          <TextField
            onChange={this.handleValueChange}
            value={value}
            style={{ marginRight: 8 }}
            label="Amount"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleTransfer}
          >
            Transfer
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

Transfer.propTypes = {
  account: PropTypes.string.isRequired,
};

Transfer.contextTypes = {
  drizzle: PropTypes.object,
};

const mapStateToProps = state => ({
  ChallengeToken: state.contracts.ChallengeToken,
  transactions: state.transactions,
  transactionStack: state.transactionStack,
  account: state.accounts[0],
});

export default drizzleConnect(Transfer, mapStateToProps);
