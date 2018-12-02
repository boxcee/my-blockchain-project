import React from 'react';
import ReactDOM from 'react-dom';
import { DrizzleProvider } from 'drizzle-react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Main from './components/Main';
import options from './options';

const Root = () => (
  <DrizzleProvider options={options}>
    <Main />
  </DrizzleProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
