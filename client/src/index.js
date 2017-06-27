/* eslint react/jsx-filename-extension: "off" */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Home from './components/Home';
import User from './components/User';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/user/:username" component={User} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
