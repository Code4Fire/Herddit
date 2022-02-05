import React, {useEffect, useState} from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../Images/music.jpeg';
import {Button } from 'semantic-ui-react';
import AlbumCard from './AlbumCard';
// import ReviewForm from './ReviewForm'


const AlbumsList = ({ albums, user }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);


  // console.log(albums.items)
  // albums.items.map(aI=>console.log(aI.id))
  // console.log(eyeDee)

  //Adding new reviews to backend
  function handleNewReview(newReview) {
    // console.log("this is new review", newReview)
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
    <React.Fragment>
    {/* <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical"> */}
      {Object.keys(albums).length > 0 && (
        <div className="albums">
          {albums.items.map((album, index) => <AlbumCard user= {user} album = {album}/>
            )}
        </div>
      )}
        {/* <div>
        {showReviews ? 
                <ReviewForm 
                  handleNewReview= {handleNewReview} 
                  reviews = {reviews} 
                  setReviews = {setReviews} 
                  album = {albums} 
                  user ={user}
                  handleRemoveReview= {handleRemoveReview}
                  key ={albums.id}
                  /> 
                : null}
              <Button 
                primary type="submit"
                onClick={handleReviewBox}>
                {showReviews ? "Close Reviews" : "View Reviews"}
              </Button>
              <button onClick = {handleFlipClick}>Click to flip</button>
        </div>
    </ReactCardFlip> */}
    </React.Fragment>
  );
};

export default AlbumsList;
