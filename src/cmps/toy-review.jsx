import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { RatingStar } from "rating-star"
import Button from '@mui/material/Button';

// import { connect } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadReviews, addReview, removeReview } from '../store/actions/review.action'
import { loadUsers } from '../store/actions/user.action'
import { RateWithStar } from './rating-star'

export function ToyReview() {

   const { reviews } = useSelector((storeState) => storeState.reviewModule )
   const { toy } = useSelector((storeState) => storeState.toyModule )
   const { users, user } = useSelector((storeState) => storeState.userModule )
   const [reviewToEdit, setReviewToEdit] = useState({ content: '', aboutToyId: '', star: '' })
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(loadReviews())
      dispatch(loadUsers())
   }, [])

   const handleChange = (ev) => {
      const { name, value } = ev.target
      setReviewToEdit({ ...reviewToEdit, [name]: value, aboutToyId: toy._id })
   }

   const saveStar = (star) => {
      setReviewToEdit({ ...reviewToEdit, star })
   }

   const onAddReview = async ev => {
      ev.preventDefault()
      if (!reviewToEdit.content) return
      await dispatch(addReview(reviewToEdit))
      showSuccessMsg('Review added')
      setReviewToEdit({ content: '', aboutToyId: '', star: '' })
   }

   const onRemove = async reviewId => {
      try {
         await dispatch(removeReview(reviewId))
         showSuccessMsg('Review removed')
      } catch (err) {
         showErrorMsg('Cannot remove')
      }
   }

   const canRemove = review => (review.byUser._id === user?._id || user?.isAdmin)

   return (
      <div className="review-app">
         {reviews &&
            <ul className="details-review">
               {reviews.map(review => (
                  review?.aboutToy?._id && review.aboutToy._id === toy._id &&
                  <li className="review-box" key={review._id}>
                     {canRemove(review) && <button onClick={() => onRemove(review._id)}>X</button>}
                     <p>{review.byUser.fullname}</p>
                     <RatingStar
                        id="non-clickable"
                        rating={review.star}
                     />
                     <p>{review.content}</p>
                  </li>
               ))}
            </ul>}

         {users && user &&
            <React.Fragment>
               <div className="review-header">Add Review</div>
               <form onSubmit={onAddReview}>
                  <textarea name="content" onChange={handleChange} value={reviewToEdit.content} ></textarea>
                  <RateWithStar saveStar={saveStar} />
                  <Button type='submit' variant="contained" color="inherit" >SEND</Button>
               </form>
            </React.Fragment>
         }
         <hr />
      </div>
   )
}