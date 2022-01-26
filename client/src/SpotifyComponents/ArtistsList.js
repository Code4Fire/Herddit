import React, {useState, useEffect}  from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../Images/music.jpeg';
import {Button } from 'semantic-ui-react';
import ReviewForm from './ReviewForm'

const ArtistsList = ({ artists, user }) => {
  const [reviews, setReviews] = useState("");
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

  function handleRemoveReview(reviewGone) {
    const updatedReviews = reviews.filter((review) => {
      return review.id !== reviewGone.id
    })
      return setReviews(updatedReviews);
    }

  return (
    <React.Fragment>
      {Object.keys(artists).length > 0 && (
        <div className="artists">
          {artists.items.map((artist, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: '18rem' }}>
                  <a
                    target="_blank"
                    href={artist.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(artist.images) ? (
                      <Card.Img
                        variant="top"
                        src={artist.images[0].url}
                        alt=""
                      />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{artist.name}</Card.Title>
                    <div className="new-Review-form">
                      {showReviews ? 
                      <ReviewForm 
                        handleNewReview= {handleNewReview} 
                        reviews = {reviews} 
                        setReviews = {setReviews}  
                        album = {artists} 
                        user ={user}
                        handleRemoveReview= {handleRemoveReview}
                        /> : null}
                        <Button 
                          primary type="submit"
                          onClick={handleReviewBox}
                          >
                          {showReviews ? "Close Reviews" : "View Reviews"}
                        </Button>
                    </div>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default ArtistsList;
