import React from 'react';
import VenueBody from './venueAPIBody'
const APIVenue = ({venuesAPI, isLoading}) => {
   
    return isLoading ? (<h1>Loading....</h1>) : 
    (
        <div className="d-flex flex-column flex-wrap align-items-start">
        {venuesAPI.map(venue => (<VenueBody key={venue.id} venue={venue}/>))}
        </div>

    )

}

export default APIVenue;