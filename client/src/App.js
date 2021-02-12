import React from 'react';
import Header from './components/header'
import Home from './components/home'
import CreatePage from './components/createpage'
import BandPage from './components/bandpage'
import VenuePage from './components/venuepage'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/createartist" component={CreatePage}/>
    <Route path="/bandpage" component={BandPage}/>
    <Route path="/venuepage" component={VenuePage} />
    </Switch>
    </Router>
  );
}

export default App;
