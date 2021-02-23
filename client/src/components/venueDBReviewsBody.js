import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Rating from 'react-rating'
import API from "../utils/API";



const VenueReviewBody = ({review}) => {

    const [artistName, setArtistName] = useState ([])
    const [artistId, setArtistId] = useState()

   const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });

    useEffect(() => {

          const fetchArtist = async () => {
          const result = await API.getBand(review.author)
          const artistReview = result.data
          console.log(artistReview)
          setArtistId(artistReview._id)
          setArtistName(artistReview.bandName)
        }
        fetchArtist()
      }, [review.author]);

    return (


      <>
        <tr>
           <td >{formatter.format(Date.parse(review.createdAt))}</td> 
           <td><Link to={`/bandpage/${artistId}`}>{artistName}</Link></td>
           <td><Rating initialRating={review.rating} emptySymbol="fa fa-star-o fa-2x smallstars" readonly fullSymbol="fa fa-star fa-2x smallstars" /></td>
           <td>{review.reviewText}</td>
        </tr>
      </>
      

    )
}

export default VenueReviewBody;