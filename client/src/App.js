import React, {useContext} from 'react';
import NavBar from './components/navbar'
import Home from './components/home'
import LogIn from './components/login'
import CreatePage from './components/createpage'
import BandPage from './components/bandpage'
import VenuePage from './components/venuepage'
import './components/styles/main.css'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthorizationContext} from './Context/AuthorizationContext'
import UserRoutes from './hocs/UserRoutes'
import NonUserRoutes from './hocs/NonUserRoutes'

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
    </Switch>
    </Router>
  );
}

export default App;
