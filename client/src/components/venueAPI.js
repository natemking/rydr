import React from 'react';
import VenueBody from './venueAPIBody'
const APIVenue = ({venuesAPI, isLoading}) => {
   
    return isLoading ? ("") : 
    (
        <div className="d-flex flex-column flex-wrap">
        {venuesAPI.map(venue => (<VenueBody key={venue.id} venue={venue}/>))}
        </div>

    )

}

export default APIVenue;