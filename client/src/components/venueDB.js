import React from 'react';
import MatchedVenue from './venueDBmatch'
// DB VENUES

const Venue = ({dbVenues}) => {
 
    const matchVenues = dbVenues
    console.log(matchVenues)
    console.log(dbVenues)


  if (matchVenues === undefined){
    return null
  }
  else{
    console.log("HELLO")
    return (
      <div className="d-flex flex-row flex-wrap mt-3 mb-3 p-2 venueDiv searchedVenues">
      {matchVenues.map(venue => (<MatchedVenue venue={venue} key={venue._id}/>))}
      </div>
    )
  }

}

export default Venue;