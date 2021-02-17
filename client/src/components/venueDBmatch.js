import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating'
import VenueReviewsTable from './venueDBReviewsTable'
import { AuthContext } from '../Context/AuthorizationContext';
import API from "../utils/API";


const MatchedVenue = ({venue}) => {
    const{isAuth}=useContext(AuthContext)
    const {id} = useContext(AuthContext)
    const createReviewLink = `/createReview/${id}` 
    const [reviews, setReviews] = useState([])
    const [reviewsRating, setReviewsRating] = useState("")
    // const [noVenue, setNoVenue] = useState(false)
  
  console.log(venue)
    // GET ALL REVIEWS FROM SEARCHED VENUE
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

    return (
      <>
            <div className="d-flex flex-column p-2 flex-wrap">
            <h2 className="m-0"><u>{venue.venueName}</u></h2>
            <div className="d-flex flex-row align-items-center">
            <Rating initialRating={reviewsRating} emptySymbol="fa fa-star-o fa-2x smallstars" readonly fullSymbol="fa fa-star fa-2x smallstars" />
            {/* <h5 className="m-2">{venue.venueReviews.length} Reviews</h5> */}
            </div>
            {isAuth?<Link to={createReviewLink}>
            <button>Add Review</button>
            </Link>:null}
            <h3 className="m-0"><u>Address:</u></h3>
            <div className="d-flex flex-column">
            {/* <p className="m-0">{venue.venueAddress[0]}</p> */}
            {/* <p className="m-0">{venue.venueAddress[1]}</p> */}
            {/* <p className="m-0">{venue.venueAddress[2]}</p> */}
            </div>
            </div>
            <VenueReviewsTable reviews={reviews}/>
      </>
    )
}

export default MatchedVenue;