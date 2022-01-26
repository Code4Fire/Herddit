import React from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Header from './Header';
import { Redirect } from 'react-router-dom';
// import SpotifyDashboard from './SpotifyDashboard';
// import SignUp from "./SignUp";

const Home = (props) => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL
  } = process.env;
  // const REACT_APP_CLIENT_ID = 50f569f615df4f0d93992374f59189be;
  // const REACT_APP_AUTHORIZE_URL = https://accounts.spotify.com/authorize;
  // const REACT_APP_REDIRECT_URL = http://localhost:3000/redirect
    
  const handleLogin = () => {
    console.log("ruhandlingHome?")
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };

  const { isValidSession, location } = props;
  const { state } = location;
  const sessionExpired = state && state.session_expired;

  return (
    <React.Fragment>

      {isValidSession() ? (
        // <Redirect to="/dashboard" />
        <Redirect to="/signup" />
      ) : (
      <div className="login">
        <Header />
          {sessionExpired && (
        <Alert variant="info">Session expired. Please login again.</Alert>
          )}
        <Button variant="info" type="submit" onClick={handleLogin}>
            Login to spotify
        </Button>
        {/* <Signup to="/signup" /> */}
      </div>
      )}
    </React.Fragment>
  );
};

export default connect()(Home);
