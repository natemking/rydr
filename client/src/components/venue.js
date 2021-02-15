import React, { useState, useEffect } from 'react';
// import Rating from 'react-rating'
import VenueReviewsTable from './venueReviewTable'
import API from "../utils/API";

const Venue = ({venue, isLoading}) => {
    const [reviews, setReviews] = useState([])

    //REVIEW AVERAGE
    useEffect(() => {
        const fetchReviews = async () => {
          const reviews = await API.getReviewByVenue(venue._id)
          const allReviews = reviews.data
          if (allReviews === undefined){
              console.log("cannot retrieve reviews")
          }
          else{
            console.log(allReviews)
            setReviews(allReviews)
          }
        }
        fetchReviews();
      }, [venue._id]);

    return isLoading ? (<h1>Loading....</h1>) : 
    (
        <div className="d-flex flex-row flex-wrap align-items-start">
        <div className="d-flex flex-column p-2 flex-wrap">
            <h1>{venue.venueName}</h1>
            <div className="d-flex flex-row align-items-center">
            <h5 className="m-2">{venue.venueReviews.length}</h5>
            </div>
            <h2>{venue.venueAddress[1]}</h2>
            <h3>Address:</h3>
            <div className="d-flex flex-column">
            <p>{venue.venueAddress[0]}</p>
            <p>{venue.venueAddress[1]}</p>
            <p>{venue.venueAddress[2]}</p>
            </div>
        </div>
        <VenueReviewsTable reviews={reviews}/>
        </div>
    )

}

export default Venue;