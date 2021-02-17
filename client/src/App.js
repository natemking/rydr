import React, {useContext} from 'react';
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
import { AuthContext } from './Context/AuthorizationContext';



function App() {
  const {currentUser, isAuth} = useContext(AuthContext)
  console.log(currentUser, isAuth, "this is in app")
  return (
    <Router>
      <NavBar />
    <Switch>
    {/* <Route path="/login" component={LogIn}/>
    <Route path="/createartist" component={CreateArtist}/>
    <Route path="/createReview" component={CreateReview} />
    <Route path="/createVenue" component={CreateVenue} />
    <Route path="/bandpage" component={BandPage}/>
    <Route path="/updateartist" component={UpdateArtist}/>
    <Route path="/venuepage" component={VenuePage} /> */}
    <NonUserRoutes path="/" exact component={Home}/>
    <NonUserRoutes path="/login" component={LogIn}/>
    <NonUserRoutes path="/createartist" component={CreateArtist}/>
    <UserRoutes path="/bandpage" component={BandPage}/>
    <UserRoutes path="/venuepage" component={VenuePage} />
    <UserRoutes path="/createReview" component={CreateReview} />
    <UserRoutes path="/createVenue" component={CreateVenue} />
    </Switch>
    </Router>
  );
}
export default App;