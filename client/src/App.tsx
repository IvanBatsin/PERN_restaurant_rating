import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AlertContextProvider } from './context/AlertCtx';
import { RestaurantContextProvider } from './context/RestaurantsCtx';
import { HomePage } from './pages/HomePage';
import { RestaurantsPage } from './pages/RestaurantPage';
import { UpdatePage } from './pages/UpdatePage';

export const App: React.FC = () =>  {
  return (
    <AlertContextProvider>
      <RestaurantContextProvider>
        <Router>  
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/restaurants/:id/update" component={UpdatePage}/>
            <Route exact path="/restaurants/:id" component={RestaurantsPage}/>
            <Redirect to='/'/>
          </Switch>
        </Router>
      </RestaurantContextProvider>
    </AlertContextProvider>
  );
}