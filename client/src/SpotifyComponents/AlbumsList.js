import React, {useEffect, useState} from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../Images/music.jpeg';
import {Button } from 'semantic-ui-react';
import ReviewForm from './ReviewForm'

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
  // function handleRemoveReview(reviewGone, id) {
  //   const updatedReviews = reviews.filter((review) => {
  //     return review.id !== reviewGone.id
  //     console.log(review.id)
  //   })
  //     return setReviews(updatedReviews);
  // }

  return (
    <React.Fragment>
      {Object.keys(albums).length > 0 && (
        <div className="albums">
          {albums.items.map((album, index) => {
            return (
              <React.Fragment key={index}>
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
              </React.Fragment>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default AlbumsList;
