import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';

class Name extends PureComponent {
  state = { dataKey: null };

  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
  }

  componentDidMount() {
    const { ChallengeToken } = this.contracts;

    // let drizzle know we want to watch the `myString` method
    const dataKey = ChallengeToken.methods['name'].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { ChallengeToken } = this.props;

    // using the saved `dataKey`, get the variable we're interested in
    const name = ChallengeToken.name[this.state.dataKey];

    // if it exists, then we display its value
    return <h1>Welcome to {name && name.value}</h1>;
  }
}

Name.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = state => ({
  ChallengeToken: state.contracts.ChallengeToken
});

export default drizzleConnect(Name, mapStateToProps);
