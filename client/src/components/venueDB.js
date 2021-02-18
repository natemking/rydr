import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating'
import VenueReviewsTable from './venueDBReviewsTable'
import { AuthContext } from '../Context/AuthorizationContext';
import API from "../utils/API";


const Venue = ({dbVenues}) => {
  const{isAuth}=useContext(AuthContext)
  const {id} = useContext(AuthContext)
  const createReviewLink = `/createReview/${id}` 
  const [reviews, setReviews] = useState([])
  const [reviewsRating, setReviewsRating] = useState("")

  useEffect(() => {

  const fetchReviews = async () => {
      try {
          const reviews = await API.getReviewByVenue(dbVenues._id)
          const venuesReviews = reviews.data
          const reviewsAvg = []
          setReviews(venuesReviews)
          var i
          for (i = 0; 0 < venuesReviews.length; i++){
            reviewsAvg.push(venuesReviews[i].rating)
            setReviewsRating((reviewsAvg.reduce((a, b ) => a + b, 0))/reviewsAvg.length)
          }
      }
      catch(err) {
        console.log(err)
      }
  }

  fetchReviews();
  
  },[dbVenues._id]);
    
  if (dbVenues.venueAddress === undefined){
    return null;
  }
  else {

    return (

      <div className="flex-row d-flex flex-wrap mt-3 mb-3 p-2 align-items-center venueDiv searchedVenues">
            <div className="flex-wrap p-2">
            <h2 className="m-0"><u>{dbVenues.venueName}</u></h2>
            <div className="flex-row align-items-center">
            <Rating initialRating={reviewsRating} emptySymbol="fa fa-star-o fa-2x smallstars" readonly fullSymbol="fa fa-star fa-2x smallstars" />
            <h5 className="m-2">{reviews.length} Reviews</h5>
            </div>
            {isAuth?<Link to={createReviewLink}>
            <button>Add Review</button>
            </Link>:null}
            <h3 className="m-0"><u>Address:</u></h3>
            <div className="flex-column">
            <p className="m-0">{dbVenues.venueAddress[0]}</p> 
            <p className="m-0">{dbVenues.venueAddress[1]}</p>
            <p className="m-0">{dbVenues.venueAddress[2]}</p>
            </div>
            </div>
            <VenueReviewsTable reviews={reviews}/>
      
      </div>

    )

  }

}

export default Venue;