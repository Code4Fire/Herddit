import React, {useState, useEffect}  from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../Images/music.jpeg';
import {Button } from 'semantic-ui-react';
import ArtistsCard from './ArtistsCard'

const ArtistsList = ({ artists, user }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  //Adding new reviews to backend
  function handleNewReview(newReview) {
    setReviews([...reviews, newReview])
  }
  function handleReviewBox() {
    setShowReviews((prevShowReviews) => !prevShowReviews);
  }

  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then((response) => response.json())
      .then((data) => {
      // console.log(data);
      setReviews(data);
      });
    }, []);

    // function handleRemoveReview(id) {
    //   const updatedReviews = reviews.filter((review) => review.id !== id);
      
    //   setReviews(updatedReviews);
    // }

  return (
    <React.Fragment>
      {Object.keys(artists).length > 0 && (
        <div className="artists">
          {artists.items.map((artist, index) => <ArtistsCard user= {user} artist = {artist}/>
          )}
        </div>
          )}    
    </React.Fragment>
  );
};

export default ArtistsList;
