import React, {useContext} from 'react';
import NavBar from './components/navbar'
import Home from './components/main-home'
import LogIn from './components/main-login'
import CreateArtist from './components/createArtist'
import BandPage from './components/main-artist'
import VenuePage from './components/main-venuepage'
import CreateReview from './components/createReview';
import './components/styles/main.css'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthorizationContext} from './Context/AuthorizationContext'
import UserRoutes from './hocs/UserRoutes'
import NonUserRoutes from './hocs/NonUserRoutes'
import CreateVenue from './components/createVenue';


function App() {
  // const {user, setUser, isAuthenicated, setIsAuthenicated} = useContext(AuthorizationContext)

  // console.log(user)
  // console.log(isAuthenicated)
  return (
    <Router>
      <NavBar />
    <Switch>
    <Route path="/" exact component={Home}/>
    <NonUserRoutes path="/login" component={LogIn}/>
    <NonUserRoutes path="/createartist" component={CreatePage}/>
    <UserRoutes path="/bandpage" component={BandPage}/>
    <UserRoutes path="/venuepage" component={VenuePage} />
    <Route path="/login" component={LogIn}/>
    <Route path="/createartist" component={CreateArtist}/>
    <Route path="/createReview" component={CreateReview} />
    <Route path="/createVenue" component={CreateVenue} />
    <Route path="/bandpage" component={BandPage}/>
    <Route path="/venuepage" component={VenuePage} />
    </Switch>
    </Router>
  );
}

export default App;
