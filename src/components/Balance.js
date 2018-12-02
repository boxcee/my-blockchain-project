import React, { PureComponent } from 'react';

class Balance extends PureComponent {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ChallengeToken;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods['balanceOf'].cacheCall(drizzleState.accounts[0], { from: drizzleState.accounts[0] });

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { ChallengeToken } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const balanceOf = ChallengeToken.balanceOf[this.state.dataKey];

    // if it exists, then we display its value
    return <p>My balance: {balanceOf && balanceOf.value}</p>;
  }
}

export default Balance;
