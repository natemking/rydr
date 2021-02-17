import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating'
import VenueReviewsTable from './venueDBReviewsTable'
import API from "../utils/API";
import { AuthContext } from '../Context/AuthorizationContext';

// DB VENUES

const Venue = ({venue, isLoading}) => {
  const{isAuth}=useContext(AuthContext)
    const [reviews, setReviews] = useState([])
    const [reviewsRating, setReviewsRating] = useState("")
    const {id} = useContext(AuthContext)

    console.log(id)
    const createReviewLink = `/createReview/${id}`

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
            {isAuth?<Link to={createReviewLink}>
            <button>Add Review</button>
            </Link>:null}
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