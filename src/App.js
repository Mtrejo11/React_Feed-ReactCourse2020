import React from 'react';
import './bootstrap.min.css';
import './App.css'
import { Switch, Route } from 'react-router-dom'

import Register from './components/Register'
import Login from './components/Login'
import ReactFeed from './components/Feed/ReactFeed'
import Splash from './components/Splash';
import Personal from './components/MyPosts/PersonalPosts'

function App() {
  return (

    <Switch>
      <Route exact path="/" >
        <Splash>
          <Route path="/" component={ReactFeed} />
        </Splash>
      </Route>

      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/personal" component={Personal} />

    </Switch>
  );
}

export default App;
