import React, {useState, useEffect}  from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../Images/music.jpeg';
import {Button } from 'semantic-ui-react';
import ReviewForm from './ReviewForm'

function ArtistsCard ({user, artist}) {
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
      if(showReviews){
    fetch(`http://localhost:3000/albums/${artist.name}/reviews`)
      .then((response) => response.json())
      .then((data) => {
      // console.log(data);
      setReviews(data);
      })
    };
    }, [showReviews]);

    function handleRemoveReview(id) {
        const updatedReviews = reviews.filter((review) => review.id !== id);
        
        setReviews(updatedReviews);
      }
return (
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
                            album = {artist} 
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
    
    ); 
}
    export default ArtistsCard;