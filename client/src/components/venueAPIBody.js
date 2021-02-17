import React, {useContext} from 'react';
import Rating from 'react-rating'
import { Link } from 'react-router-dom';
import {AuthContext} from '../Context/AuthorizationContext'

//API VENUES

const VenueBody = ({venue}) => {
const {id, isAuth} = useContext(AuthContext)

    console.log(id)
    const createReviewLink = `/createReview/${id}`

    return (
        <div className="my-2 mb-2 p-2 d-flex flex-row venueDiv flex-wrap searchedVenues">
        <div className="d-flex flex-column mx-2 apitext">
        <h3><u>{venue.name}</u></h3>
        <div className="d-flex flex-row align-items-center">
        <Rating initialRating={0} emptySymbol="fa fa-star-o fa-2x smallstars" readonly fullSymbol="fa fa-star fa-2x smallstars" />
        <h5 className="m-2">No Reviews</h5>
        </div>
        {isAuth?<Link to={createReviewLink} >
        <button>Add Review</button>
        </Link>:null}
        <p className="m-0">{venue.location.address}</p>
        <p className="m-0">{venue.location.city + ", " + venue.location.state}</p>
        </div>
        <table className="table table-responsive ml-auto table-striped table-bordered bandreviews apiVenueReviews">
        <thead>
            <tr>
            <th className="text-center">Date</th>
            <th className="text-center">Venue Name</th>
            <th className="text-center">Rating</th>
            <th className="text-center">Review</th>
            </tr>
        </thead>
        </table>
        </div>
    )
}

export default VenueBody;