import SpotifyDashboard from './SpotifyComponents/SpotifyDashboard';
import {useEffect, useState} from 'react';
import {useHistory, useLocation, Switch, Route} from 'react-router-dom';
import Header from './SpotifyComponents/Header'
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import RedirectPage from './SpotifyComponents/RedirectPage';

function Dashboard({ user, setUser, expiryTime, setExpiryTime, isValidSession }) {

//   const {
//     REACT_APP_CLIENT_ID,
//     REACT_APP_AUTHORIZE_URL,
//     REACT_APP_REDIRECT_URL
//     } = process.env;
// console.log(REACT_APP_CLIENT_ID)
// ...refactoring below...
  const REACT_APP_CLIENT_ID = "50f569f615df4f0d93992374f59189be";
  const REACT_APP_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
  const REACT_APP_REDIRECT_URL = "http://localhost:4000/redirect"

  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
    };
      
  const history = useHistory();
  const location = useLocation();
  const { state } = location;
  const sessionExpired = state && state.session_expired;

  useEffect(()=>{
    let expiryTime;
      try {
        expiryTime = JSON.parse(localStorage.getItem('expiry_time'));
      } catch (error) {
        expiryTime = '0';
      }
  setExpiryTime({ expiryTime });
    },[])

  
    
  function handleLogoutClick() {
    fetch("/logout", {
      method: "DELETE"
    })
          .then((r) => {
              if (r.ok) {
                  setUser(null);
              }
          });
  }
// console.log(isValidSession())
  if (user) {
    return (
    <React.Fragment>
    <Navbar handleLogoutClick = {handleLogoutClick} user={user}/>
      <h1> Welcome, {user.email}!</h1>
    
      {isValidSession() ? (

      <Redirect to = "/SpotifyDashboard"/>
    

      ) : (
        <div className="login">
          <Header />
          {sessionExpired && (
            <Alert variant="info">Session expired. Please login again.</Alert>
          )}
          <Button variant="info" type="submit" onClick={handleLogin}>
            Login to spotify
          </Button>
        </div>
          )}
    </React.Fragment>
    ) 
  } else {
    return null
  }
}
export default Dashboard