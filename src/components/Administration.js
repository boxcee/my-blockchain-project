import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Button, FormControl, TextField, Typography } from '@material-ui/core';
import { utils } from 'web3';

const styles = {
  main: {
    padding: 16
  }
};

class Administration extends PureComponent {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = {
      stackId: null,
      value: '',
      owner: null,
      error: null
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
      this.setState({ error: `${value} it not a valid address!` });
    }
  };

  handleChange = (e) => {
    const { value } = e.target;
    if (!utils.isAddress(value)) {
      this.setState({ error: `${value} is not a valid address!` });
    } else {
      this.setState({ error: null });
    }
    this.setState({ value: e.target.value });
  };

  getTxStatus = () => {
    const { stackId } = this.state;
    const { transactions, transactionStack } = this.props;
    const txHash = transactionStack[stackId];
    if (!txHash) return null;
    return `Transaction status: ${transactions[txHash].status}`;
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
        <Typography>Use this view to whitelist addresses.</Typography>
        <p>{this.getTxStatus()}</p>
        <FormControl>
          <TextField
            style={{ marginRight: 8, width: 250 }}
            onChange={this.handleChange}
            value={value}
            label="Enter an address to whitelist"
            error={!!error}
            helperText={error}
          />
          <Button variant="contained" color="primary" onClick={this.addToWhitelist}>Add to whitelist</Button>
        </FormControl>
      </div>
    );
  }
}

Administration.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  transactionStack: PropTypes.array.isRequired,
  account: PropTypes.string.isRequired,
  Whitelist: PropTypes.object.isRequired
};

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

export default withStyles(styles)(drizzleConnect(Administration, mapStateToProps));
