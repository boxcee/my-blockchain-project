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
    const dataKey = ChallengeToken.methods.name.cacheCall();
    this.setState({ dataKey });
  }

  render() {
    const { dataKey } = this.state;
    const { ChallengeToken } = this.props;

    const name = ChallengeToken.name[dataKey];

    return (
      <h1>
        Welcome to
        {' '}
        {name && name.value}
      </h1>
    );
  }
}

Name.propTypes = {
  ChallengeToken: PropTypes.object.isRequired,
};

Name.contextTypes = {
  drizzle: PropTypes.object,
};

const mapStateToProps = state => ({
  ChallengeToken: state.contracts.ChallengeToken,
});

export default drizzleConnect(Name, mapStateToProps);
