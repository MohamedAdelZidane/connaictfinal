import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Home from './home/Home'
import Candidates from './candidates/Candidates'
import Recruiters from './recruiters/Recruiters'
import App from './App';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/candidates" component={Candidates} />
        <Route path="/recruiters" component={Recruiters} />
      </div>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
