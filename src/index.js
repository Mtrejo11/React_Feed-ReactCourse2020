import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';

const RouterApp = (<Router>
    <App/>
</Router>)


ReactDOM.render(RouterApp, document.getElementById('root'));

