import React from 'react';
import VenueBody from './venueBody'
const APIVenue = ({venuesAPI, isLoading}) => {
   
    return isLoading ? (<h1>Loading....</h1>) : 
    (
        <div className="d-flex flex-row flex-wrap align-items-start">
        {/* <img alt="venueMap" className="img-fluid" src="https://via.placeholder.com/420"></img> */}
        <div className="d-flex flex-column p-2 flex-wrap">
        {venuesAPI.map(venue => (<VenueBody venue={venue}/>))}
        </div>
        </div>
    )

}

export default APIVenue;