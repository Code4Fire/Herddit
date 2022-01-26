import React, {useState} from 'react'
import {Card, Input, Grid, Comment} from 'semantic-ui-react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function ReviewForm ({ user, album, id , reviews, setReviews, handleNewReview, handleRemoveReview }) {
    const [username, setUsername]= useState("")
    const [comment, setComment] = useState("")
    const [date, setDate] = useState("")
// console.log(user)
    function handleUserChange(event){
        setUsername(event.target.value)
    }
    function handleCommentChange(event){
        setComment(event.target.value)
    }
    function handleDateChange(event){
        setDate(event.target.value)
    }
    const resetData = (e) => {
        e.preventDefault()
        setUsername("")
        setComment("")
        setDate("")
        };
    function handleAddNewReview(e) {
        e.preventDefault()
        // e.target.reset()
          fetch("/reviews", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              username: username,
              date: date, 
              comment: comment, 
              album: album,
              user_id: user.id
            })
          })
        .then(res => res.json())
        // .then(d=>console.log(d))
        // .then(newReview => {
        //   handleNewReview(newReview)
        .then((newReview) => handleNewReview(newReview));
        setComment("")
    }

    function handleDeleteClick(reviewid) {
        fetch(`http://localhost:3000/reviews/${reviewid}`, {
          method: "DELETE",
        })
        .then((r) => r.json())
        .then(() => {
            handleRemoveReview(reviewid);
        });
      }

    // console.log("hello", reviews)
    return (
        <Grid.Column>
            <Card centered >
                <Card.Content>
                    <Card.Header>{username}...is typing</Card.Header>

                    <Card.Description>{date}</Card.Description>
                    <Comment.Group>
                        <Comment>
                            <Comment.Avatar src='https://as1.ftcdn.net/v2/jpg/01/89/44/46/1000_F_189444626_ErFjW1mpwCCUEdnJ4ZnJfoLTk66Qf5Tj.jpg' />
                            <Comment.Content>
                                {reviews.map((review) => {
                                    return (
                                        <Comment.Text>
                                            {review.comment}
                                                <Button 
                                                    type="submit" 
                                                    onClick ={() => handleDeleteClick(review.id)}
                                                    > X 
                                                </Button>
                                        </Comment.Text>
                                    )
                                })}
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Card.Content>
        <div className="new-review-form">
            <h2>New Review</h2>
                <form 
                onSubmit= {handleAddNewReview}
                >
                    <Input 
                        type="text" 
                        name="name"   
                        placeholder="User name" 
                        value = {username} 
                        onChange={handleUserChange}/>
          
                    <Input 
                        type="text" 
                        name="date" 
                        placeholder="Date" 
                        value = {date} 
                        onChange = {handleDateChange}/>

                    <Input 
                        type="text" 
                        name="review" 
                        placeholder="Your Review" 
                        value ={comment} 
                        onChange = {handleCommentChange}/>

                    <Button 
                        size = "small"
                        variant = "contained"
                        endIcon= {<SendIcon/>}
                        type="submit" 
                        // onClick ={resetData}
                        > Add Review
                    </Button>
                </form>
        </div>
        </Card>
        </Grid.Column>
    );


}
export default ReviewForm;