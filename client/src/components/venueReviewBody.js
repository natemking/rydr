import React, { useEffect, useState } from 'react';
import Rating from 'react-rating'
import API from "../utils/API";

const VenueReviewBody = ({review}) => {
    const [artistName, setArtistName] = useState ([])

    useEffect(() => {
        const fetchArtist = async () => {
          const result = await API.getUser(review.author)
          const artistReview = result.data
          setArtistName(artistReview.bandName)
        }
        fetchArtist()
      }, [review.author]);

    return (
        <tr>
           <td>{review.createdAt}</td>
           <td>{artistName}</td>
           <td><Rating initialRating={review.rating} emptySymbol="fa fa-star-o fa-2x" readonly fullSymbol="fa fa-star fa-2x" /></td>
           <td>Venue Avg Rating</td>
           <td>{review.reviewText}</td>
        </tr>
    )
}

export default VenueReviewBody;