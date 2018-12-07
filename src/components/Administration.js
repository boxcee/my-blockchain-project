import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Button, CircularProgress, TextField, Typography,
} from '@material-ui/core';
import { utils } from 'web3';
import green from '@material-ui/core/colors/green';
import Error from './Error';
import Success from './Success';

const styles = theme => ({
  main: {
    padding: 16,
  },
  administration: {
    display: 'flex',
    marginTop: 16,
    width: 600,
    justifyContent: 'space-between',
  },
  input: {
    width: 385,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class Administration extends PureComponent {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = {
      stackId: null,
      value: '',
      owner: null,
      error: null,
    };
  }

  componentDidMount() {
    const { Whitelist } = this.contracts;
    const dataKey = Whitelist.methods.owner.cacheCall();
    this.setState({ owner: dataKey });
  }

  addToWhitelist = () => {
    const { value } = this.state;
    const { account } = this.props;
    if (utils.isAddress(value)) {
      const { Whitelist } = this.contracts;
      const stackId = Whitelist
        .methods
        .addToWhitelist
        .cacheSend(value, { from: account });
      this.setState({ stackId });
    } else {
      this.setState({ error: 'Not a valid address! Must be a valid Ethereum address.' });
    }
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleErrorClose = () => {
    this.setState({ error: null });
  };

  getTxStatus = () => {
    const { stackId } = this.state;
    const { transactions, transactionStack, classes } = this.props;
    const txHash = transactionStack[stackId];
    if (!txHash || transactions[txHash].status === 'success') return null;
    return <CircularProgress className={classes.buttonProgress} size={24} />;
  };

  isStatus = (status) => {
    const { stackId } = this.state;
    const { transactions, transactionStack } = this.props;
    const txHash = transactionStack[stackId];
    return txHash && transactions[txHash].status === status;
  };

  handleSuccessClose = () => {
    this.setState({
      stackId: null,
      value: '',
    });
  };

  render() {
    const { owner, error, value } = this.state;
    const { Whitelist, account, classes } = this.props;

    if (!Whitelist.owner[owner] || Whitelist.owner[owner].value !== account) {
      return (
        <div className={classes.main}>
          <Typography variant="headline">You do not have access rights to view this page.</Typography>
        </div>
      );
    }

    return (
      <div className={classes.main}>
        <Typography variant="headline">Administration</Typography>
        <Typography>Use this view to whitelist an address.</Typography>
        <div className={classes.administration}>
          <TextField
            className={classes.input}
            onChange={this.handleChange}
            value={value}
            label="Enter an address to whitelist"
            error={!!error}
          />
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addToWhitelist}
              disabled={this.isStatus('pending')}
            >
              Add to whitelist
            </Button>
            {this.getTxStatus()}
          </div>
        </div>
        <Error error={error} onClose={this.handleErrorClose} />
        <Success
          success={this.isStatus('success') ? 'Address was successfully added to whitelist!' : null}
          onClose={this.handleSuccessClose}
        />
      </div>
    );
  }
}

Administration.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  transactionStack: PropTypes.array.isRequired,
  account: PropTypes.string.isRequired,
  Whitelist: PropTypes.object.isRequired,
};

Administration.contextTypes = {
  drizzle: PropTypes.object,
};

const mapStateToProps = state => ({
  ChallengeToken: state.contracts.ChallengeToken,
  Whitelist: state.contracts.Whitelist,
  transactions: state.transactions,
  transactionStack: state.transactionStack,
  account: state.accounts[0],
});

export default withStyles(styles)(drizzleConnect(Administration, mapStateToProps));
