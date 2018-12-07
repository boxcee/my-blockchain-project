import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography, withStyles } from '@material-ui/core';
import { utils } from 'web3';
import Error from './Error';

const styles = theme => ({
  main: {
    padding: 16
  },
  input: {
    marginTop: 24,
    width: 385
  },
  button: {
    marginTop: 24
  },
  balance: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 550
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  }
});

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
      this.setState({ error: 'Not a valid address! Must be a valid Ethereum address.' });
    }
  };

  handleErrorClose = () => {
    this.setState({ error: null });
  };

  render() {
    const { value, error, dataKey } = this.state;
    const { ChallengeToken, classes } = this.props;

    const balanceOf = ChallengeToken.balanceOf[dataKey];

    return (
      <div className={classes.main}>
        <Typography variant="headline">Balance</Typography>
        <Typography>Use this view to check the balance of an address.</Typography>
        {balanceOf && (
          <Typography>
            {`The balance of address ${value} is `}<strong>{balanceOf.value}</strong>{' CHT'}
          </Typography>)}
        <div className={classes.balance}>
          <TextField
            onChange={this.handleInputChange}
            value={value}
            className={classes.input}
            label="Enter an address"
            error={!!error}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleShowBalance}
            className={classes.button}
          >
            Show balance
          </Button>
        </div>
        <Error error={error} onClose={this.handleErrorClose} />
      </div>
    );
  }
}

BalanceOf.propTypes = {
  ChallengeToken: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

BalanceOf.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = state => ({
  ChallengeToken: state.contracts.ChallengeToken
});

export default withStyles(styles)(drizzleConnect(BalanceOf, mapStateToProps));
