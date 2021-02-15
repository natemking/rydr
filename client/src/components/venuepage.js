import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Venue from '../components/venue.js'
import API from "../utils/API";

const VenuePage = () => {
  const [venueAll, setVenuesAll] = useState([])
  const [selectedVenue, setSelectedVenue] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [venueAPI, setVenueAPI] = useState([])
  const [city, setCity] = useState('philadelphia')
  const [radius, setRadius] = useState('1')



  // useEffect(() => {
  //   const fetchVenuesAPI = async () => {
  //     const url = `https://api.foursquare.com/v2/venues/search?client_id=GSIEWB3V0L4OOFEWHBX4R0K1MOB0CJOJWGLSHHEP0DPKHNP1&client_secret=IABLARJ3OWCNSLW1VR00W4IB33FK3H1MLP32XJF5JWW3LFL4&v=20180323&categoryId=4bf58dd8d48988d1e5931735`;

  //     const result = await axios(`${url}&limit=100&near=${city}&radius=${radius}`)
  //     console.log(result.data.response.venues);
  //     setVenueAPI(result.data.response.venues);
  //   }

  // }, [venueAPI, city, radius]);

  const handleBtnSubmit = (e) => {
    e.preventDefault();
    const fetchVenuesAPI = async () => {
      try{
      const url = `https://api.foursquare.com/v2/venues/search?client_id=GSIEWB3V0L4OOFEWHBX4R0K1MOB0CJOJWGLSHHEP0DPKHNP1&client_secret=IABLARJ3OWCNSLW1VR00W4IB33FK3H1MLP32XJF5JWW3LFL4&v=20180323&categoryId=4bf58dd8d48988d1e5931735`;

      const result = await axios(`${url}&limit=100&near=${city}&radius=${radius}`)
      console.log(result.data.response.venues);
      setVenueAPI(result.data.response.venues);
      } catch (err) {console.error(err);}

    }
    fetchVenuesAPI();
  }




  useEffect(() => {
    const fetchVenues = async () => {
      const result = await API.getVenues()
      setVenuesAll(result.data)
      setisLoading(false)
    }
    fetchVenues()
  }, []);

  useEffect(() => {
    setSelectedVenue(venueAll.filter(function (venue) {
      return ((venue.venueName).toLowerCase()).includes(search.toLowerCase())
    }))
  }, [venueAll, search]);

  function consoleFunc() {
    console.log(search)
    console.log(selectedVenue)
    console.log(venueAll)
    console.log(city)
    console.log(radius)
    console.log(venueAPI)
  }

  return (
    <div className="d-flex flex-column mt-2 p-2">
      <input type="text" placeholder="Search.." value={search} className="mb-2 venueSearch" onChange={(e) => setSearch(e.target.value)}></input>
      <input type="text" placeholder="Specifiy City.." value={city} className="mb-2 venueSearch" onChange={(e) => setCity(e.target.value)}></input>
      <input type="text" placeholder="Set Search Radius.." value={radius} className="mb-2 venueSearch" onChange={(e) => setRadius(e.target.value)}></input>
      <button onClick={consoleFunc}>PRESS ME</button>

      <button onClick={handleBtnSubmit}>SUBMIT</button>

      <Venue isLoading={isLoading} venue={venueAPI} />

    </div>
  )
}

export default VenuePage;