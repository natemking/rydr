import React from 'react';
import VenueReviewBody from './venueReviewBody'

const VenueReviewsTable = ({reviews, isLoading}) => {
   
    return isLoading ? (<h1>Loading....</h1>) : 
    (
        <table className="table table-responsive table-dark table-striped table-bordered bandreviews">
        <thead>
            <tr>
            <th className="text-center">Date</th>
            <th className="text-center">Band</th>
            <th className="text-center">Rating</th>
            <th className="text-center">Review</th>
            </tr>
        </thead>
      <tbody>
          {reviews.map(review => (<VenueReviewBody review={review} key={review._id}/>))}
      </tbody>
    </table>
    )

}

export default VenueReviewsTable;