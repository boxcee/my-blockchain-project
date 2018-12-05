import React from 'react';
import ReactDOM from 'react-dom';
import { DrizzleProvider } from 'drizzle-react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Layout from './components/Layout';
import options from './options';

const Root = () => (
  <DrizzleProvider options={options}>
    <Layout />
  </DrizzleProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
