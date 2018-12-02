import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import Name from './Name';
import Balance from './BalanceOf';
import Administration from './Administration';
import Transfer from './Transfer';

class Main extends PureComponent {
  render() {
    const { drizzleStatus, web3 } = this.props;

    if (web3.status === 'failed') {
      return (
        <main>
          <h1>
            <span role="img">⚠</span>
            ️
          </h1>
          <p>
            This browser has no connection to the Ethereum network.
            Please use the Chrome/FireFox extension MetaMask,
            or dedicated Ethereum browsers Mist or Parity.
          </p>
        </main>
      );
    }

    if (!drizzleStatus.initialized) {
      return (
        <main>
          <h1>
            <span role="img">⚙</span>
            ️
          </h1>
          <p>Loading dapp...</p>
        </main>
      );
    }

    return (
      <div>
        <Name />
        <Administration />
        <Balance />
        <Transfer />
      </div>
    );
  }
}

Main.propTypes = {
  drizzleStatus: PropTypes.object.isRequired,
  web3: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  drizzleStatus: state.drizzleStatus,
  web3: state.web3,
});

export default drizzleConnect(Main, mapStateToProps);
