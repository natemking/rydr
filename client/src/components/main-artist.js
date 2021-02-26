import React, { useEffect, useState } from 'react';
import ReviewsTable from "./artist-ReviewsTable";
import Artist from "./artist-artistBody";
import API from "../utils/API";

const BandPage = ({ match }) => {
  // State for artist data
  const [artist, setArtist] = useState ('');
  // State for artists reviews
  const [reviews, setReviews] = useState([]);
  // State for loading message
  const [isLoading, setIsLoading] = useState(true);
  // State for editing band profile
  const [edit, setEdit] = useState(false);

  // Call DB for artist & their review data and set to state
  useEffect(() => {
    (async () => {
        try {
          const artist = await API.getBand(match.params.id);
          const reviews = await API.getReviewByBand(match.params.id);
          setArtist(artist.data);
          setReviews(reviews.data);
          setIsLoading(false);
        } catch (err) { console.error(err) }
      })();
  }, [match.params.id]);

  const handleEdit = () => {
    setEdit(true)
  }

  // Render the artist page
  return (
    <div className="d-flex flex-column mt-2 p-2 align-items-center">
      <Artist artist={ artist } isLoading={ isLoading } id={match.params.id} edit={ edit } handleEdit={ handleEdit } />
      
      { edit ? null : 
        <div className="d-flex flex-column flex-wrap">
          <h1>
            <u>Artist Reviews</u>
          </h1>
          <ReviewsTable reviews={reviews} isLoading={isLoading} id={match.params.id} />
        </div>
      }
      
      <hr />
    </div>
  )
}
    
export default BandPage;