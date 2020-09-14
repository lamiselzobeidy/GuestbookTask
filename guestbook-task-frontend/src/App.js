import React from 'react';
import './App.css';
import WelcomePage from './components/WelcomePage/WelcomePage'
import Homepage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import MainNavbar from './components/MainNavbar/MainNavbar';
import {Route, Switch} from 'react-router-dom';

function App() {
  console.log(window.location.pathname);
  if (window.location.pathname === "/") {
    if(sessionStorage.getItem('user'))
    {return (
    <div className="App">
          <Navbar />
        <Switch>
            <Route path="/homepage" component={Homepage} />
          </Switch>
        </div>
        );}
    else{
    return (
        <div className="App">
          <WelcomePage />
        </div>
    )
    }
  }
  else{
  return (
    <div className="App">
      <MainNavbar />
      <Switch>
        <Route path="/homepage" component={Homepage} />
        </Switch>
    </div>
  );
  }
}

export default App;
