import React from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Admin from './form/Admin';
import Login from './form/Login';
import ChangePassword from './form/ChangePassword';
import Home from './core/Home';
import Menu from './core/Menu';
import Tech from './core/Tech';
import User from './core/User';

function Routes() {
    return (
       <BrowserRouter>
         <Menu />
          <Switch>
          <Route path='/' exact component={Home}/> 
          <Route path='/tech' exact component={Tech}/> 
          <Route path='/user' exact component={User}/> 
          <Route path='/admin' exact component={Admin}/> 
          <Route exact path="/login" component={Login}/>
          <Route exact path="/changepassword/:id" component={ChangePassword}/>
          </Switch>
       </BrowserRouter>
    )
}

export default Routes
