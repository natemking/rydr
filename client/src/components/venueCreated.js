import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating'
import VenueReviewsTable from './venueDBReviewsTable'
import API from "../utils/API";
// DB VENUES

const CreatedVenues = ({venue, isLoading}) => {
    const [reviews, setReviews] = useState([])

    //GET ALL REVIEWS FOR SEARCHED VENUE
    useEffect(() => {
        const fetchReviews = async () => {
          const reviews = await API.getReviewByVenue(venue._id)
          const allReviews = reviews.data
          if (allReviews === undefined){
              console.log("cannot retrieve reviews")
          }
          else{
            setReviews(allReviews)
          }
        }
        fetchReviews();
      }, [venue._id]);

    //IF DBVENUE IS UNDEFINED
    if (venue.venueReviews === undefined || venue.venueAddress === undefined){
      venue.venueReviews = ["", "", ""]
      venue.venueAddress = ["", "", ""]
    }

    if (venue.venueAddress)
    return isLoading ? (<h1>Loading....</h1>) : 
    (
        <div className="d-flex flex-row flex-wrap align-items-start searchedVenues">
        <div className="d-flex flex-column p-2 flex-wrap">
            <h2 className="m-0"><u>{venue.venueName}</u></h2>
            <div className="d-flex flex-row align-items-center">
            <Rating initialRating={5} emptySymbol="fa fa-star-o fa-2x smallstars" readonly fullSymbol="fa fa-star fa-2x smallstars" />
            <h5 className="m-2">{venue.venueReviews.length} Reviews</h5>
            </div>
            <Link to="/createVenueReview">
            <button>Add Review</button>
            </Link>
            <h3 className="m-0"><u>Address:</u></h3>
            <div className="d-flex flex-column">
            <p className="m-0">{venue.venueAddress[0].value}</p>
            <p className="m-0">{venue.venueAddress[1].value}</p>
            <p className="m-0">{venue.venueAddress[2].value}</p>
            </div>
        </div>
        {/* <VenueReviewsTable reviews={reviews}/> */}
        </div>
    )

}

export default CreatedVenues;