import React, { Component } from 'react';
import Name from './components/Name';
import './App.css';
import Balance from './components/Balance';

class App extends Component {
  state = {
    loading: true,
    drizzleState: null
  };

  componentDidMount() {
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { loading, drizzleState } = this.state;
    const { drizzle } = this.props;

    if (loading) {
      return null;
    }

    return (
      <div>
        <Name drizzle={drizzle} drizzleState={drizzleState} />
        <Balance drizzle={drizzle} drizzleState={drizzleState} />
      </div>
    );
  }
}

export default App;
