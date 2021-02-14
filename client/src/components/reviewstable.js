import React from 'react';
import ReviewBody from "./reviewBody"

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
        {/* <tr>
          <td>02/11/20</td>
          <td>Crocodile Rock</td>
          <td><Rating initialRating={2.5} emptySymbol="fa fa-star-o fa-2x" readonly fullSymbol="fa fa-star fa-2x" /></td>
          <td><Rating initialRating={2.5} emptySymbol="fa fa-star-o fa-2x" readonly fullSymbol="fa fa-star fa-2x" /></td>
          <td>This was TRASH</td>
        </tr> */}
      </tbody>
    </table>
    )

}

export default ReviewsTable;