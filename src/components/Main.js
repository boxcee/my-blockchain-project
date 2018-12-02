import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import Name from './Name';
import Balance from './Balance';
import Administration from './Administration';

class Main extends PureComponent {
  render() {
    const { drizzleStatus, web3 } = this.props;

    if (web3.status === 'failed') {
      return (
        <main>
          <h1><span role="img">⚠</span>️</h1>
          <p>This browser has no connection to the Ethereum network. Please use the Chrome/FireFox extension MetaMask,
            or dedicated Ethereum browsers Mist or Parity.</p>
        </main>
      );
    }

    if (!drizzleStatus.initialized) {
      return (
        <main>
          <h1><span role="img">⚙</span>️</h1>
          <p>Loading dapp...</p>
        </main>
      );
    }

    return (
      <div>
        <Name />
        <Administration />
        <Balance />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  drizzleStatus: state.drizzleStatus,
  web3: state.web3
});

export default drizzleConnect(Main, mapStateToProps);
