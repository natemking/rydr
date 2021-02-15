import axios from 'axios';
import React, {useState, useEffect} from 'react';
import APIVenue from './apivenue'
import Venue from '../components/venue.js'
import API from "../utils/API";

const VenuePage = () => {
  // const [venueAll, setVenuesAll] = useState([])
  const [selectedVenue, setSelectedVenue] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [search, setSearch ] = useState({
    venueName: "",
    city: "",
    radius: ""
  })
  const [venuesAPI, setVenueAPI] = useState([])

//MAKES THE API CALL DEPENDING ON WHAT THE CITY AND RADIUS IS
  useEffect(() => {
    const fetchVenuesAPI = async () => {
      const url = `https://api.foursquare.com/v2/venues/search?client_id=GSIEWB3V0L4OOFEWHBX4R0K1MOB0CJOJWGLSHHEP0DPKHNP1&client_secret=IABLARJ3OWCNSLW1VR00W4IB33FK3H1MLP32XJF5JWW3LFL4&v=20180323&categoryId=4bf58dd8d48988d1e5931735`;
      const result = await axios(`${url}&limit=10&near=${search.city}&radius=${search.radius}`)
      setVenueAPI(result.data.response.venues);
      setisLoading(false)
    }
    fetchVenuesAPI();
  }, [search.city, search.radius]);

//MAKES DATABASE CALL TO FIND VENUE MADE ON DB
  useEffect(() => {
    const fetchVenues = async () => {
      const result = await API.getVenueByName(search.venueName)
      const venueObject = result.data[0]
      if (venueObject === undefined){
        setSelectedVenue({
          "venueName": "",
          "venueAddress": ["", "", ""],
          "venueReviews": [{rating:1},{rating:1},{rating:1}]
        })
      }
      else{
        console.log(venueObject)
        setSelectedVenue(venueObject)
        setisLoading(false)
      }
    }
    fetchVenues()
  }, [search.venueName]);

//SETS THE SEARCH STATE
  function handleChange(event){
    const value = event.target.value
    setSearch({
      ...search,
      [event.target.name]: value
    }) 
  }

  function consoleFunc(event){
    event.preventDefault()
    console.log(selectedVenue)
  }

    return (
        <div className="d-flex flex-column mt-2 p-2">
        <form onSubmit={consoleFunc}>
        <input type="text" placeholder="Search.." name={"venueName"} value={search.venueName} className="mb-2 venueSearch" onChange={handleChange}></input>
        <input type="text" placeholder="Specifiy City.." name={"city"} value={search.city} className="mb-2 venueSearch" onChange={handleChange}></input>
        <input type="number" placeholder="Set Search Radius.." name={"radius"} value={search.radius} className="mb-2 venueSearch" onChange={handleChange}></input>
        <input type="submit" value={"Submit"} className="mb-2 venueSearch" ></input>
        </form>
        <button onClick={consoleFunc}>PRESS ME</button>
        <Venue isLoading={isLoading} venue={selectedVenue}/>
        <APIVenue venuesAPI={venuesAPI} isLoading={isLoading}/>
        </div>
     )
}
    
export default VenuePage;