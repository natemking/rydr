import React from 'react';
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
import CreateVenue from './components/createVenue';


function App() {
  return (
    <Router>
      <NavBar />
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/login" component={LogIn}/>
    <Route path="/createartist" component={CreateArtist}/>
    <Route path="/createReview" component={CreateReview} />
    <Route path="/createVenue" component={CreateVenue} />
    <Route path="/bandpage" component={BandPage}/>
    <Route path="/updateartist" component={UpdateArtist}/>
    <Route path="/venuepage" component={VenuePage} />
    </Switch>
    </Router>
  );
}

export default App;
