import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';
import SignUp from "./SignUp";
import SignInSide from './SignInSide';
import Dashboard from "./Dashboard";
import RedirectPage from './SpotifyComponents/RedirectPage';
import { useHistory, useLocation } from 'react-router-dom';
import SpotifyDashboard from "./SpotifyComponents/SpotifyDashboard";

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory()
  const location= useLocation()
  const [expiryTime, setExpiryTime]=useState("0");
// console.log(user)
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  
  const isValidSession = () => {
    // console.log('Hi')
    const currentTime = new Date().getTime();
    const isSessionValid = currentTime < expiryTime.expiryTime;
    // console.log(expiryTime.expiryTime)
    // console.log(currentTime)
    return isSessionValid;
  
  };
  return (
    <div className="App">
      <main>
        {user ? (
          <Switch>
            <Route path="/SpotifyDashboard">
              <SpotifyDashboard isValidSession= {isValidSession} history = {history} user = {user} setUser = {setUser}/>
            </Route>
            <Route path= "/redirect">
              <RedirectPage user={user} history = {history} location = {location} setExpiryTime={setExpiryTime}/>
            </Route>
            <Route path="/">
              <Dashboard user={user} setUser={setUser} expiryTime={expiryTime} setExpiryTime= {setExpiryTime} isValidSession= {isValidSession}/>
            </Route>
            
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <SignInSide setUser={setUser} />
            </Route>
            <Route path="/signup">
              <SignUp setUser={setUser} />
            </Route>
          </Switch>
        )}
        </main>
    </div>
  );
}

export default App;
