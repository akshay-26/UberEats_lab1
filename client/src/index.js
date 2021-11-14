import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';   
import App from './App'
import  {Provider} from 'react-redux'
import allReducer from './reducers/index'
import {createStore, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import persistedReducer from '../src/reducers';

const store = createStore(allReducer ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



ReactDOM.render(
  <Provider store = {store}>
  <Router>
    <App />
  </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
