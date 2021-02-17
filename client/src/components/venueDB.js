import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating'
import VenueReviewsTable from './venueDBReviewsTable'
import API from "../utils/API";
// DB VENUES

const Venue = ({venue, isLoading}) => {
    const [reviews, setReviews] = useState([])
    const [reviewsRating, setReviewsRating] = useState("")
    
    //GET ALL REVIEWS FOR SEARCHED VENUE
    useEffect(() => {
        const fetchReviews = async () => {
          try{
            const reviews = await API.getReviewByVenue(venue._id)
            const allReviews = reviews.data
            const averageRating = ((allReviews[0].rating + allReviews[1].rating + allReviews[2].rating)/3)
            setReviews(allReviews)
            setReviewsRating(averageRating)
          }catch(err){
            console.log(err)
          }
        }
        fetchReviews();
      }, [venue._id]);

    //IF DBVENUE IS UNDEFINED
    if (venue.venueReviews === undefined || venue.venueAddress === undefined){
      venue.venueReviews = ["", "", ""]
      venue.venueAddress = ["", "", ""]
    }
    return isLoading ? ("") : 
    (
        <div className="d-flex flex-row flex-wrap mt-3 mb-3 p-2 venueDiv searchedVenues">
        <div className="d-flex flex-column p-2 flex-wrap">
            <h2 className="m-0"><u>{venue.venueName}</u></h2>
            <div className="d-flex flex-row align-items-center">
            <Rating initialRating={reviewsRating} emptySymbol="fa fa-star-o fa-2x smallstars" readonly fullSymbol="fa fa-star fa-2x smallstars" />
            <h5 className="m-2">{venue.venueReviews.length} Reviews</h5>
            </div>
            <Link to="/createReview">
            <button>Add Review</button>
            </Link>
            <h3 className="m-0"><u>Address:</u></h3>
            <div className="d-flex flex-column">
            <p className="m-0">{venue.venueAddress[0]}</p>
            <p className="m-0">{venue.venueAddress[1]}</p>
            <p className="m-0">{venue.venueAddress[2]}</p>
            </div>
        </div>
        <VenueReviewsTable reviews={reviews}/>
        </div>
    )

}

export default Venue;