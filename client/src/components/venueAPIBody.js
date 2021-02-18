import React, {useContext,  useEffect, useState} from 'react';
import Rating from 'react-rating'
import { Link } from 'react-router-dom';
import {AuthContext} from '../Context/AuthorizationContext'
import API from "../utils/API";
//API VENUES

const VenueBody = ({venue}) => {
const {id, isAuth} = useContext(AuthContext)
const [repeatedVenue, setRepeatedVenue] = useState(false)
const createReviewLink = `/createReview/${id}`
const [newVenue, setNewVenue] = useState({
    "venueName": venue.name,
    "venueAddress": [venue.location.address || "", venue.location.city, venue.location.state]
    })

    useEffect(() => {

        const fetchDBVenues = async () => {
            try {
                const results = await API.getVenues()
                const allDBVenues = results.data
                    var i;
                    for ( i = 0; i < allDBVenues.length; i++){
                        if (allDBVenues[i].venueName === venue.name){
                            setRepeatedVenue(true)
                        }
                    }
            }
            catch(err) {
            console.log(err)
            }
        }

        fetchDBVenues();
        
        }, [venue]);

        const createDBVenue = async () => {
            try{
                if (venue.location.address === undefined){
                    setNewVenue({
                    "venueName": venue.name,
                    "venueAddress": ["", venue.location.city, venue.location.state]
                    })
                    await API.createVenueByName(venue.venueName, newVenue)
                }
                else{
                    setNewVenue({
                    "venueName": venue.name,
                    "venueAddress": [venue.location.address, venue.location.city, venue.location.state]
                    })
                    await API.createVenueByName(venue.venueName, newVenue)
                }
            }catch(err){
                console.log(err)
            }
        }

    return (repeatedVenue) ? (null) : (

        <div className="my-2 mb-2 p-2 d-flex flex-row venueDiv flex-wrap searchedVenues">
        <div className="d-flex flex-column mx-2 apitext">
        <h3><u>{venue.name}</u></h3>
        <div className="d-flex flex-row align-items-center">
        <Rating initialRating={0} emptySymbol="fa fa-star-o fa-2x smallstars" readonly fullSymbol="fa fa-star fa-2x smallstars" />
        <h5 className="m-2">No Reviews</h5>
        </div>
        {isAuth?<Link to={createReviewLink} >
        <button onClick={createDBVenue}>Add Review</button>
        </Link>:null}
        <p className="m-0">{venue.location.address}</p>
        <p className="m-0">{venue.location.city + ", " + venue.location.state}</p>
        </div>
        <table className="table table-responsive ml-auto table-striped table-bordered bandreviews apiVenueReviews">
        <thead>
            <tr>
            <th className="text-center">Date</th>
            <th className="text-center">Venue Name</th>
            <th className="text-center">Rating</th>
            <th className="text-center">Review</th>
            </tr>
        </thead>
        </table>
        </div>

    )
}

export default VenueBody;