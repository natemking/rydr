import React from 'react';
import ReviewBody from "./artist-ReviewBody"

const ReviewsTable = ({reviews, isLoading}) => {
   
    return isLoading ? (<h1>Loading....</h1>) : 
    (
        <table className="table table-responsive table-dark table-striped table-bordered bandreviews">
        <thead>
            <tr>
            <th className="text-center">Date</th>
            <th className="text-center">Venue Name</th>
            <th className="text-center">Rating</th>
            <th className="text-center">Venue Average</th>
            <th className="text-center">Review</th>
            </tr>
        </thead>
      <tbody>
          {reviews.map(review => (<ReviewBody review={review} key={review._id}/>))}
      </tbody>
    </table>
    )

}

export default ReviewsTable;