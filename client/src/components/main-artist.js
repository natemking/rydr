import React, { useEffect, useState } from 'react';
import ReviewsTable from "./artist-ReviewsTable";
import Artist from "./artist-artistBody";
import API from "../utils/API";

const BandPage = ({ match }) => {
  const [artist, setArtist] = useState ('')
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState([])

useEffect(() => {
  fetchArtistAndReviews();
  
}, []);

// useEffect(() => {
//   fetchReviews();
// }, []);


  const fetchArtistAndReviews = async () => {
    const artist = await API.getUser(match.params.id);
    const reviews = await API.getReviewByBand(match.params.id);
    setArtist(artist.data);
    setReviews(reviews.data);
    setIsLoading(false);
  }

  // const fetchReviews = async () => {
  //   const reviews = await API.getReviewByBand(match.params.id)
  //   setReviews(reviews.data)
  //   setIsLoading(false)
  // }

    return (
      
      <div className="d-flex flex-column mt-2 p-2 align-items-center">
        <Artist artist={ artist } isLoading={ isLoading } />
        <div className="d-flex flex-column flex-wrap">
          <h1><u>Artist Reviews</u></h1>
          <ReviewsTable reviews={ reviews } isLoading={ isLoading }/>
        </div>
        <hr />
      </div>
    )
}
    
export default BandPage;