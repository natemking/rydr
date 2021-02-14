import React from 'react';
import NavBar from './components/navbar'
import Home from './components/home'
import LogIn from './components/login'
import CreatePage from './components/createpage'
import BandPage from './components/bandpage'
import VenuePage from './components/venuepage'
import './components/styles/main.css'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavBar />
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/login" component={LogIn}/>
    <Route path="/createartist" component={CreatePage}/>
    <Route path="/bandpage" component={BandPage}/>
    <Route path="/venuepage" component={VenuePage} />
    </Switch>
    </Router>
  );
}

export default App;
