import React from 'react';
import VenueReviewBody from './venueDBReviewsBody'

const VenueReviewsTable = ({reviews, isLoading}) => {

    return isLoading ? (<h1>Loading....</h1>) : 
    (

        <div className="d-flex flex-wrap">
        <table className="table-bordered bandreviews">
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
    </div>
    
    )

}

export default VenueReviewsTable;