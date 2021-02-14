import React, {useState, useEffect} from 'react';
import Venue from '../components/venue.js'
import API from "../utils/API";

const VenuePage = () => {
  const [venueAll, setVenuesAll] = useState([])
  const [selectedVenue, setSelectedVenue] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [search, setSearch ] = useState("")

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