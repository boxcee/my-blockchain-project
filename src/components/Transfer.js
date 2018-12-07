import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import {
  Button, CircularProgress, TextField, Typography, withStyles,
} from '@material-ui/core';
import { utils } from 'web3';
import Error from './Error';
import Success from './Success';

const styles = {
  main: { padding: 16 },
  description: { marginBottom: 12 },
  input: { display: 'flex' },
  recipient: { width: 385 },
};

const getValue = (contract, method, key) => (contract[method][key]
  && contract[method][key].value);

class Transfer extends PureComponent {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = {
      whitelisted: null,
      balance: null,
      value: '',
      error: null,
      address: '',
      stackId: null,
    };
  }

  getTxStatus = () => {
    const { stackId } = this.state;
    const { transactions, transactionStack } = this.props;
    const txHash = transactionStack[stackId];
    if (!txHash || transactions[txHash].status === 'success') return null;
    return <CircularProgress />;
  };

  getSuccess = () => {
    const { stackId } = this.state;
    const { transactions, transactionStack } = this.props;
    const txHash = transactionStack[stackId];
    return txHash && transactions[txHash].status === 'success' ? 'Transaction was successful!' : null;
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
      this.setState({ error: 'Not a valid address! Must be a valid Ethereum address.' });
    }
  };

  isWhitelisted = (address) => {
    const { Whitelist } = this.contracts;
    return utils.isAddress(address) ? Whitelist
      .methods
      .isWhitelisted
      .cacheCall(address) : null;
  };

  getBalance = () => {
    const { ChallengeToken } = this.contracts;
    const { account } = this.props;
    return ChallengeToken
      .methods
      .balanceOf
      .cacheCall(account);
  };

  handleAddressChange = (e) => {
    const { value } = e.target;
    this.setState({
      address: value,
      whitelisted: this.isWhitelisted(value),
    });
  };

  handleValueChange = (e) => {
    const { value } = e.target;
    if (Number.isNaN(value)) {
      this.setState({ error: 'Amount needs to be a number. Only integers are allowed!' });
    } else {
      this.setState({
        value,
        balance: this.getBalance(),
        error: null,
      });
    }
  };

  handleErrorClose = () => {
    this.setState({ error: null });
  };

  handleSuccessClose = () => {
    this.setState({
      stackId: null,
      value: '',
      address: '',
    });
  };

  render() {
    const {
      value, error, address, whitelisted, balance,
    } = this.state;
    const { classes, Whitelist, ChallengeToken } = this.props;
    const isWhitelisted = (Whitelist.isWhitelisted[whitelisted]
      && Whitelist.isWhitelisted[whitelisted].value);
    const availableTokens = Number(getValue(ChallengeToken, 'balanceOf', balance));
    const hasEnoughTokens = availableTokens >= Number(value);

    return (
      <div className={classes.main}>
        <Typography variant="headline">Transfer</Typography>
        <Typography className={classes.description}>
          Use this view to transfer tokens from your address to another.
        </Typography>
        <div className={classes.input}>
          <TextField
            onChange={this.handleAddressChange}
            value={address}
            className={classes.recipient}
            style={{ marginRight: 8 }}
            label="Recipient address"
            error={!!error && !!address}
            helperText={(!isWhitelisted
              && !!address
              && utils.isAddress(address))
              ? 'This address is not whitelisted yet.'
              : null}
          />
          <TextField
            onChange={this.handleValueChange}
            value={value}
            style={{ marginRight: 8 }}
            label="Amount"
            error={!!error}
            helperText={(!hasEnoughTokens
              && !!availableTokens)
              ? 'You don\'t have enough tokens.'
              : null}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleTransfer}
            disabled={!isWhitelisted || !hasEnoughTokens}
          >
            Transfer
          </Button>
          {this.getTxStatus()}
        </div>
        <Error error={error} onClose={this.handleErrorClose} />
        <Success success={this.getSuccess()} onClose={this.handleSuccessClose} />
      </div>
    );
  }
}

Transfer.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired,
  transactions: PropTypes.object.isRequired,
  transactionStack: PropTypes.array.isRequired,
  ChallengeToken: PropTypes.object.isRequired,
  Whitelist: PropTypes.object.isRequired,
};

Transfer.contextTypes = {
  drizzle: PropTypes.object,
};

const mapStateToProps = state => ({
  ChallengeToken: state.contracts.ChallengeToken,
  Whitelist: state.contracts.Whitelist,
  transactions: state.transactions,
  transactionStack: state.transactionStack,
  account: state.accounts[0],
});

export default withStyles(styles)(drizzleConnect(Transfer, mapStateToProps));
