import React, {useState, useEffect}  from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../Images/music.jpeg';
import {Button } from 'semantic-ui-react';
import PlayListCard from './PlayListCard'

const PlayList = ({ playlist, user }) => {
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

    function handleRemoveReview(id) {
      const updatedReviews = reviews.filter((review) => review.id !== id);
      
      setReviews(updatedReviews);
    }

  return (
    <div>
      {Object.keys(playlist).length > 0 && (
        <div className="playlist">
          {playlist.items.map((item, index) => <PlayListCard user= {user} playlist = {playlist} item ={item}/>
            )}
        </div>
      )}  
    </div>
  );
};

export default PlayList;
