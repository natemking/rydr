import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Venue from '../components/venue.js'
import API from "../utils/API";

const VenuePage = () => {
  const [venueAll, setVenuesAll] = useState([])
  const [selectedVenue, setSelectedVenue] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [search, setSearch ] = useState("")
  const [venueAPI, setVenueAPI] = useState([])

  useEffect(() => {
    const fetchVenuesAPI = async () => {
      const client_id= 'GSIEWB3V0L4OOFEWHBX4R0K1MOB0CJOJWGLSHHEP0DPKHNP1';
      const secret= 'IABLARJ3OWCNSLW1VR00W4IB33FK3H1MLP32XJF5JWW3LFL4';
      const result = await axios(`https://api.foursquare.com/v2/venues/search?`)

      console.log(result.data)
    }
    fetchVenuesAPI();
  }, [])

  useEffect(() => {
    const fetchVenues = async () => {
      const result = await API.getVenues()
      setVenuesAll(result.data)
      setisLoading(false)
    }
    fetchVenues()
  }, []);

  useEffect(() => {
    setSelectedVenue(venueAll.filter(function(venue){
    return ((venue.venueName).toLowerCase()).includes(search.toLowerCase())
  }))
  }, [venueAll, search]);

  function consoleFunc(){
    console.log(search)
    console.log(selectedVenue)
    console.log(venueAll)
  }

    return (
        <div className="d-flex flex-column mt-2 p-2">
        <input type="text" placeholder="Search.." value={search} className="mb-2 venueSearch" onChange={(e) => setSearch(e.target.value)}></input>
        <button onClick={consoleFunc}>PRESS ME</button>
        <Venue isLoading={isLoading} venue={selectedVenue}/>
        </div>
     )
}
    
export default VenuePage;