import {Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Logout from './Components/Logout';



function App() {
  return (
   <div>
    <Navbar /> 
  <Switch>
    <Route exact path='/'><Home /></Route>
    <Route  path='/login'><Login /></Route>
    <Route  path='/register'><Register /></Route>
    <Route  path='/logout'><Logout /></Route>



  </Switch>
   </div>
  );
}

export default App;
