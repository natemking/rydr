import React from 'react';



const VenueBody = ({venue}) => {

    return (
        <h1>{venue.name}</h1>
        // {/* <h1>{venue[0].venueName}</h1>
        //     <div className="d-flex flex-row align-items-center">
        //     <Rating initialRating={2.5} emptySymbol="fa fa-star-o fa-2x"  fullSymbol="fa fa-star fa-2x" />
        //     <h5 className="m-2">{venue[0].venueReviews.length}</h5>
        //     </div>
        //     <h2>{venue[0].venueAddress[1]}</h2>
        //     <h3>Address:</h3>
        //     <div className="d-flex flex-column">
        //     <p>{venue[0].venueAddress[0]}</p>
        //     <p>{venue[0].venueAddress[1]}</p>
        //     <p>{venue[0].venueAddress[2]}</p>
        //     </div>
        //     <a href="#">Venue Website</a> */}
    )
}

export default VenueBody;