import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import {
  Button, TextField, Typography, withStyles,
} from '@material-ui/core';
import { utils } from 'web3';

const styles = {
  main: { padding: 16 },
};

class Transfer extends PureComponent {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = {
      dataKey: null, value: '', error: null, address: '',
    };
  }

  getTxStatus = () => {
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
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Typography variant="headline">Transfer</Typography>
        <Typography>Use this view to transfer tokens from your address to another.</Typography>
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
    );
  }
}

Transfer.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(drizzleConnect(Transfer, mapStateToProps));
