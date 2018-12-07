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
  state = { name: null };

  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
  }

  componentDidMount() {
    const { ChallengeToken } = this.contracts;
    const name = ChallengeToken.methods.name.cacheCall();
    this.setState({ name });
  }

  render() {
    const { name } = this.state;
    const { ChallengeToken, classes } = this.props;

    const title = ChallengeToken.name[name];

    return (
      <Typography variant="h6" color="inherit" className={classes.grow}>
        {title ? title.value : 'Welcome'}
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
