import React, {useContext, useEffect, useState} from 'react';
import NavBar from './components/navbar'
import Home from './components/main-home'
import LogIn from './components/main-login'
import CreateArtist from './components/createArtist'
import BandPage from './components/main-artist'
import VenuePage from './components/main-venuepage'
import CreateVenue from './components/createVenue';
import CreateReview from './components/createReview'
import './components/styles/main.css'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserRoutes from './hocs/UserRoutes'
import NonUserRoutes from './hocs/NonUserRoutes'
import AuthProvider from './Context/AuthorizationContext';
import AuthServices from "./Services/AuthorizationService";


function App() {
  const [currentUser, setCurrentUser]=useState();
  const [isAuth, setIsAuth]=useState(false);
  const [isLoading, setIsLoading]=useState(false);
  const [id, setId]=useState()

  return (
    <AuthProvider value ={{currentUser, isAuth, id, setId, setCurrentUser, setIsAuth} }>
    <Router>
      <NavBar />
    <Switch>
    {/* <Route path="/login" component={LogIn}/>
    <Route path="/createartist" component={CreateArtist}/>
    <Route path="/createReview" component={CreateReview} />
    <Route path="/createVenue" component={CreateVenue} />
    <Route path="/bandpage/:id" component={BandPage}/>
    <Route path="/updateartist" component={UpdateArtist}/>
    <Route path="/venuepage" component={VenuePage} /> */}
    <NonUserRoutes path="/" exact component={Home}/>
    <NonUserRoutes path="/login" component={LogIn}/>
    <NonUserRoutes path="/createartist" component={CreateArtist}/>
    <UserRoutes path="/bandpage/:id" component={BandPage}/>
    <Route path="/venuepage" component={VenuePage} />
    <UserRoutes path="/createReview" component={CreateReview} />
    <UserRoutes path="/createVenue" component={CreateVenue} />
    </Switch>
    </Router>
    </AuthProvider>
  );
}
export default App;