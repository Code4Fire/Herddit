import React, {useEffect, useState} from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../Images/music.jpeg';
import {Button } from 'semantic-ui-react';
import ReviewForm from './ReviewForm'

function AlbumCard ({user, album}) {
    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState (false)

//Adding new reviews to backend
    function handleNewReview(newReview) {
    // console.log("this is new review", newReview)
        setReviews([...reviews, newReview])
    }

    function handleReviewBox() {
        setShowReviews((prevShowReviews) => !prevShowReviews);
    }

  useEffect(() => {
      if (showReviews){
    fetch(`http://localhost:3000/albums/${album.name}/reviews`)
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
          href={album.external_urls.spotify}
          rel="noopener noreferrer"
          className="card-image-link"
        >
          {!_.isEmpty(album.images) ? (
            <Card.Img
              variant="top"
              src={album.images[0].url}
              alt=""
            />
          ) : (
            <img src={music} alt="" />
          )}
        </a>
        <Card.Body>
          <Card.Title>{album.name}</Card.Title>
          <Card.Text>
            <small>
              {album.artists.map((artist) => artist.name).join(', ')}
            </small>
          </Card.Text>
            <div className="new-Review-form">
              {showReviews ? 
                <ReviewForm 
                  handleNewReview= {handleNewReview} 
                  reviews = {reviews} 
                  setReviews = {setReviews} 
                  album = {album} 
                  user ={user}
                  handleRemoveReview= {handleRemoveReview}
                  key ={album.id}
                  /> 
                : null}
              <Button 
                primary type="submit"
                onClick={handleReviewBox}>
                {showReviews ? "Close Reviews" : "View Reviews"}
              </Button>
            </div>    
        </Card.Body>
      </Card>

  );


}
export default AlbumCard;