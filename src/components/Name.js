import React, { PureComponent } from 'react';

class Name extends PureComponent {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.ChallengeToken;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods['name'].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }


  render() {
    // get the contract state from drizzleState
    const { ChallengeToken } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const name = ChallengeToken.name[this.state.dataKey];

    // if it exists, then we display its value
    return <p>Token name: {name && name.value}</p>;
  }
}

export default Name;
