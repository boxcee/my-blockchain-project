import React, { PureComponent } from 'react';
import { drizzleConnect } from 'drizzle-react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const styles = {
  grow: {
    flexGrow: 1,
  },
};

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
    const { ChallengeToken, classes } = this.props;

    const name = ChallengeToken.name[dataKey];

    return (
      <Typography variant="h6" color="inherit" className={classes.grow}>
        {name ? name.value : 'Welcome'}
      </Typography>
    );
  }
}

Name.propTypes = {
  ChallengeToken: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

Name.contextTypes = {
  drizzle: PropTypes.object,
};

const mapStateToProps = state => ({
  ChallengeToken: state.contracts.ChallengeToken,
});

export default withStyles(styles)(drizzleConnect(Name, mapStateToProps));
