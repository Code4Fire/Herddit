import React, { useEffect, useState } from 'react';
import { useHistory, Link, NavLink } from 'react-router-dom';
import {
  initiateGetResult,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists
} from '../actions/result';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SearchResult from './SearchResult';
import SearchForm from './SearchForm';
import Header from './Header';
import Loader from './Loader';
import Navbar from '../Navbar';
import { Button } from 'react-bootstrap';
import HerdditLogo from '../Images/Herddit.png'

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('albums');
  const {isValidSession, history, user, setUser} = props
  // const [user, setUser] = useState(null)

  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(initiateGetResult(searchTerm)).then(() => {
        setIsLoading(false);
        setSelectedCategory('albums');
      });
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };

  const loadMore = async (type) => {
    if (isValidSession()) {
      const { dispatch, albums, artists, playlist } = props;
      setIsLoading(true);
      switch (type) {
        case 'albums':
          await dispatch(initiateLoadMoreAlbums(albums.next));
          break;
        case 'artists':
          await dispatch(initiateLoadMoreArtists(artists.next));
          break;
        case 'playlist':
          await dispatch(initiateLoadMorePlaylist(playlist.next));
          break;
        default:
      }
      setIsLoading(false);
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };
  const { albums, artists, playlist } = props;
  const result = { albums, artists, playlist };

  function handleLogoutSearch() {
    fetch("/logout", {
      method: "DELETE"
    })
          .then((r) => {
              // if (r.ok) {
                isValidSession(null);
          });
  }
  return (
    <React.Fragment>
      {/* <div style="background-image: url(./Images/signupimage.jpg); opacity: 0.5;"></div> */}
                      
      <img id="HerdditLogo" src= {HerdditLogo} alt="Logo"/>
      {isValidSession() ? (
        <div>
          <Button
              className="navbar-item"
              activeClassName="is-active"
              onClick={handleLogoutSearch}
              href="/"
            >
              Back to Login
            </Button>
      
          <Header/>
          <SearchForm handleSearch={handleSearch} />
          <Loader show={isLoading}>Loading...</Loader>
          <SearchResult
            result={result}
            loadMore={loadMore}
            setCategory={setCategory}
            selectedCategory={selectedCategory}
            isValidSession={isValidSession}
            user= {user}
          />
        </div>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {
              session_expired: true
            }
          }}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    artists: state.artists,
    playlist: state.playlist
  };
};

export default connect(mapStateToProps)(Dashboard);
