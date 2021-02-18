import React, { useEffect, useState } from 'react';
import Rating from 'react-rating'
import API from "../utils/API";

const ReviewBody = ({review}) => {
    const [venueName, setVenueName] = useState ([])
    useEffect(() => {
        const fetchVenue = async () => {
          const result = await API.getVenueById(review.venue)
          setVenueName(result.data.venueName)
        }
        fetchVenue()
      }, [review.venue]);

    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });
    
    return (
        <tr>
          <td>{formatter.format(Date.parse(review.createdAt))}</td>
           <td>{venueName}</td>
           <td><Rating initialRating={review.rating} emptySymbol="fa fa-star-o fa-2x" readonly fullSymbol="fa fa-star fa-2x" /></td>
           <td>{review.reviewText}</td>
        </tr>
    )
}

export default ReviewBody;