import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard';

import './App.css';

const App = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Dashboard} />
    </Switch>
    </BrowserRouter>
) 

// const App = () =>( <Dashboard/>) 

export default App;
