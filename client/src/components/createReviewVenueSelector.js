import React from 'react';


const VenueSelector = ({venue}) => {

    return (
        <>
        <option value={venue._id}>{venue.venueName}</option>
        </>
    )
}

export default VenueSelector;