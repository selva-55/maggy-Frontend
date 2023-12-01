import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Swiggy from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {Store} from './ReduxStore/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={Store}>
    <Swiggy />
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
