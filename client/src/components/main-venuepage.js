import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import APIVenue from './venueAPI'
import Venue from './venueDB.js'
import API from "../utils/API";
import { AuthContext } from '../Context/AuthorizationContext';


const VenuePage = () => {
  const {isAuth}=useContext(AuthContext)
  const [dbVenues, setdbVenues] = useState([{}])
  // const [selectedVenue, setSelectedVenue] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [search, setSearch] = useState({
    venueName: "",
    city: "",
    radius: ""
  })
  const [venuesAPI, setVenueAPI] = useState([])

  //MAKES THE API CALL DEPENDING ON WHAT THE CITY AND RADIUS IS
  const handleBtnSubmit = (e) => {
    e.preventDefault();
    fetchVenuesAPI();
    fetchVenues();
  }

  const fetchVenuesAPI = async () => {
    try {
      const url = `https://api.foursquare.com/v2/venues/search?client_id=GSIEWB3V0L4OOFEWHBX4R0K1MOB0CJOJWGLSHHEP0DPKHNP1&client_secret=IABLARJ3OWCNSLW1VR00W4IB33FK3H1MLP32XJF5JWW3LFL4&v=20180323&categoryId=4bf58dd8d48988d1e5931735`;
      const result = await axios(`${url}&limit=10&near=${search.city}&radius=${search.radius}`)
      setVenueAPI(result.data.response.venues);
      setisLoading(false)
    } catch (err) { console.error(err); }
  }

  //MAKES DATABASE CALL TO FIND VENUE MADE ON DB
  const fetchVenues = async () => {
    // const result = await API.getVenueByName(search.venueName)
    const newResult = await API.getVenues()
    const allVenues = newResult.data
    const matchedVenues = []
    const notmatchVenues = []
    var i
    
    //IF SEARCH BAR IS EMPTY
    for (i=0; i < allVenues.length; i++){

      //IF VENUENAME SEARCH CONTAINS VENUE IN DB
      if (allVenues[i].venueName.replace(/\s/g, "").toLowerCase().includes(search.venueName.replace(/\s/g, "").toLowerCase()) === true){
        //IF THE VENUE IS LOCATED IN THE CITY YOU ARE SEARCHING
        if(allVenues[i].venueAddress[1].replace(/\s/g, "").toLowerCase().includes(search.city.replace(/\s/g, "").toLowerCase())=== true){
          matchedVenues.push(allVenues[i])
          setdbVenues(matchedVenues)
        }
        else{
          notmatchVenues.push(allVenues[i])
        }
      }
      // IF NO MATCH IN OUR DBVENUE MATCHES SEARCH NAME
      else if((allVenues[i].venueName.replace(/\s/g, "").toLowerCase().includes(search.venueName.replace(/\s/g, "").toLowerCase()))){
        //BUT IF IT MATCHES A CITY SEARCH
        if (allVenues[i].venueAddress[1].replace(/\s/g, "").toLowerCase().includes(search.city.replace(/\s/g, "").toLowerCase())=== true){
          matchedVenues.push(allVenues[i])
          setdbVenues(matchedVenues)
        }
        else{
          notmatchVenues.push(allVenues[i])
        }
      } 
    }
    // console.log(matchedVenues)
  }


  //SETS THE SEARCH STATE
  function handleChange(event) {
    const value = event.target.value
    setSearch({
      ...search,
      [event.target.name]: value
    })
  }

  return (
    <div className="flex-column mt-2 p-2">
      <div className="d-flex justify-content-center align-items-center flex-column">
      <h1><u>Search for a Venue</u></h1>
      <form>
        <input type="text" placeholder="Search.." name={"venueName"} value={search.venueName} className="mb-2 venueSearch" onChange={handleChange}></input>
        <input type="text" placeholder="Specifiy City.." name={"city"} value={search.city} className="mb-2 venueSearch" onChange={handleChange}></input>
        <input type="number" placeholder="Set Search Radius.." name={"radius"} value={search.radius} className="mb-2 venueSearch " onChange={handleChange}></input>
        <button onClick={handleBtnSubmit} className="venueSearch venueSearchBtn">Search Venues</button>
        {isAuth?<Link to="/createVenue">
        <button className="venueSearchBtn">Create Venue</button>
        </Link>:null}
      </form>

      {/* WHERE VENUES SHOW UP */}
      <div className="align-items-start">
      <Venue dbVenues={dbVenues} />
      {/* <APIVenue venuesAPI={venuesAPI} isLoading={isLoading} /> */}
      </div>
      </div>
    </div>
  )
}

export default VenuePage;