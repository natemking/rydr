import React from 'react';
import Rating from 'react-rating'

//API VENUES

const VenueBody = ({venue}) => {


    return (
        <div className="my-2 p-2 d-flex flex-row apiVenues">
        <div className="d-flex flex-column mx-2 apitext">
        <h3><u>{venue.name}</u></h3>
        <div className="d-flex flex-row align-items-center">
        <Rating initialRating={0} emptySymbol="fa fa-star-o fa-2x smallstars" readonly fullSymbol="fa fa-star fa-2x smallstars" />
        <h5 className="m-2">No Reviews</h5>
        </div>
        <p className="m-0">{venue.location.address}</p>
        <p className="m-0">{venue.location.city}</p>
        <p className="m-0">{venue.location.state}</p>
        </div>
        <table className="table table-responsive table-dark table-striped table-bordered bandreviews apiVenueReviews">
        <thead>
            <tr>
            <th className="text-center">Date</th>
            <th className="text-center">Venue Name</th>
            <th className="text-center">Rating</th>
            <th className="text-center">Review</th>
            </tr>
        </thead>
      <tbody>
          <tr>
              <td colSpan={4}>             
            
            </td>
          </tr>
      </tbody>
    </table>
        </div>
    )
}

export default VenueBody;