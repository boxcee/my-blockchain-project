import React from 'react';
import ReactDOM from 'react-dom';
import { Drizzle, generateStore } from "drizzle";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MyStringStore from "./contracts/MyStringStore.json";

const options = { contracts: [MyStringStore] };

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));
serviceWorker.unregister();
