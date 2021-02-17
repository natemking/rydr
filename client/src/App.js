import React, {useContext} from 'react';
import NavBar from './components/navbar'
import Home from './components/main-home'
import LogIn from './components/main-login'
import CreateArtist from './components/createArtist'
import UpdateArtist from './components/artist-Update'
import BandPage from './components/main-artist'
import VenuePage from './components/main-venuepage'
import CreateReview from './components/createReview';
import './components/styles/main.css'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthContext} from './Context/AuthorizationContext'
import UserRoutes from './hocs/UserRoutes'
import NonUserRoutes from './hocs/NonUserRoutes'
import CreateVenue from './components/createVenue';


function App() {
  const {user, setUser, isAuthenicated, setIsAuthenicated} = useContext(AuthContext)

  console.log(user)
  console.log(isAuthenicated)
  return (
    <Router>
      <NavBar />
    <Switch>
    {/* <Route path="/" exact component={Home}/>
    <Route path="/login" component={LogIn}/>
    <Route path="/createartist" component={CreateArtist}/>
    <Route path="/createReview" component={CreateReview} />
    <Route path="/createVenue" component={CreateVenue} />
    <Route path="/bandpage/:id" component={BandPage}/>
    <Route path="/updateartist" component={UpdateArtist}/>
    <Route path="/venuepage" component={VenuePage} /> */}
    <NonUserRoutes path="/login" component={LogIn}/>
    <NonUserRoutes path="/createartist" component={CreateArtist}/>
    <UserRoutes path="/bandpage" component={BandPage}/>
    <UserRoutes path="/venuepage" component={VenuePage} />
    <UserRoutes path="/createReview" component={CreateReview} />
    <UserRoutes path="/createVenue" component={CreateVenue} />
    <UserRoutes path="/bandpage" component={BandPage}/>
    </Switch>
    </Router>
  );
}

export default App;
