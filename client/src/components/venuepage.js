import React, { useState, useEffect } from "react";
import Rating from 'react-rating'
import API from "../utils/API";

const VenuePage = () => {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    
    const handleOnChange = (e) => {
        const {value} = e.target
        setSearch(value)
    }

    const handleBtnSubmit = (e) => {
        e.preventDefault();

        const searchFor
    }
    // const [venues, setVenues] = useState([]);
    // const [formObject, setFormObject] = useState([]);

    // useEffect(() => {
      
    // }, [])

    // function loadVenuesById() {
    //     API.getVenueById()
    //     .then(res=> 
    //         setVenues(res.venues)
    //         )
    //         .catch(err => console.log(err));
    // }

    // function loadVenuesByName() {
    //     API.getVenueByName()
    //     .then(res=> 
    //         setVenues(res.venues)
    //         )
    //         .catch(err => console.log(err));
    // }

    



   
    return (

        <div className="d-flex flex-column mt-2 p-2">
        <div className="d-flex flex-row flex-wrap align-items-start">
        <img alt="venueMap" className="img-fluid" src="https://via.placeholder.com/420"></img>
        <div className="d-flex flex-column p-2 flex-wrap">
            <h1>Venue Name</h1>
            <div className="d-flex flex-row align-items-center">
            <Rating initialRating={2.5} emptySymbol="fa fa-star-o fa-2x"  fullSymbol="fa fa-star fa-2x" />
            <h5 className="m-2">55 Reviews</h5>
            </div>
            <h2>City, State</h2>
            <h3>Address:</h3>
            <p>This is where the address goes</p>
            <a href="#">Venue Website</a>
        </div>
        </div>
        <div className="d-flex flex-column flex-wrap justify-content-center">
        <h1 className="text-center"><u>Venue Reviews</u></h1>
       <table className="table table-dark table-striped table-bordered">
        <thead>
            <tr>
            <th className="text-center">Date</th>
            <th className="text-center">Band Name</th>
            <th className="text-center">Rating</th>
            <th className="text-center">Review</th>
            </tr>
        </thead>
      <tbody>
        <tr> {/*first review */}
          <td>02/11/20</td> {/*REVIEW DATE*/}
          <td>The Beatles</td> {/*BAND NAME*/}
          <td><Rating initialRating={2.5} emptySymbol="fa fa-star-o fa-2x" readonly fullSymbol="fa fa-star fa-2x" /></td> {/*VENUE RATING*/}
          <td>THIS VENUE WAS TRASH</td>
        </tr>
      </tbody>
    </table>

        </div>
        <hr></hr>
        </div>
    
     )
}
    
export default VenuePage;