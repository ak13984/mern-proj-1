import React, {useState, useCallback, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import Users from "./users/pages/Users"
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook'

function App() {

  const {token, login, logout, userId} = useAuth();

  let routes;

  if(token){
    routes=(
      <Switch>
        <Route exact path="/" component={Users} />
        <Route exact path="/:userId/places" component={UserPlaces}></Route>
        <Route exact path="/places/new" component={NewPlace} />
        <Route exact path="/places/:placeId" component={UpdatePlace} />
        <Redirect to = "/"/>
      </Switch>
    )
  }else{
    routes=(
      <Switch>
        <Route exact path="/" component={Users} />
        <Route exact path="/:userId/places" component={UserPlaces}></Route>
        <Route exact path="/auth" component={Auth}></Route>
        <Redirect to="/auth"></Redirect>
      </Switch>
    )
  }


  return (
    <AuthContext.Provider 
    value={
      {isLoggedIn: !!token, 
      token: token,  
      userId: userId, 
      login: login, 
      logout: logout}}>
      <Router>
        <MainNavigation />
        <main>
            {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
