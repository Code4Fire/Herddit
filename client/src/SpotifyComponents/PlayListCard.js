import React, {useEffect, useState} from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../Images/music.jpeg';
import {Button } from 'semantic-ui-react';
import ReviewForm from './ReviewForm'

function PlayListCard ({user, playlist, item}) {
    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState (false)
    const [albumReviews, setAlbumReviews] = useState([])

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
          console.log(item)
      fetch(`http://localhost:3000/albums/${item.name}/reviews`)
        .then((response) => response.json())
        .then((data) => {
        console.log('response', data);
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
                href={item.external_urls.spotify}
                rel="noopener noreferrer"
                className="card-image-link"
            >
                {!_.isEmpty(item.images) ? (
                    <Card.Img 
                        variant="top" 
                        src={item.images[0].url} 
                        alt="" 
                    />
                    ) : (
                        <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <small>By {item.owner.display_name}</small>
                    </Card.Text>
                      <div className="new-Review-form">
                        {showReviews ? 
                        <ReviewForm 
                          handleNewReview= {handleNewReview} 
                          reviews = {reviews} 
                          setReviews = {setReviews}  
                          album = {playlist} 
                          user ={user}
                          handleRemoveReview= {handleRemoveReview}
                          /> : null}
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
export default PlayListCard;