import React, { useState, useEffect, useContext } from 'react';
import VenueSelector from './createReviewVenueSelector'
import API from '../utils/API'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthorizationContext';
import Modal from './Modal';

const CreateReview = () => {
  // State for modal error message
  const [modalMsg, setModalMsg] = useState('');
  // State for modal visibility
  const [show, setShow] = useState(false);

  const handleClose = () => { setShow(false); history.push("/venuepage") };
  const handleShow = () => setShow(true);

  const {id} = useContext(AuthContext)
    const [allVenues, setAllVenues] = useState([])
    const [venueReview, setVenueReview] = useState({
        "venue": "",
        "rating": "",
        "reviewText": ""
    })
    let history = useHistory();
    
    useEffect(() => {
        const fetchVenues = async () => {
          const result = await API.getVenues()
          const allVenues = result.data
          if (allVenues === undefined) {
            setAllVenues([{venueName:""}, {venueName:""}])
            console.log("cannot reach")
          }
          else {
            setAllVenues(allVenues)
          }
        }
        fetchVenues()
      }, []);
    
    const createReview = (event) => {
        const target = event.target.name
        const value = event.target.value
        setVenueReview({...venueReview, [target]: value, rating:  parseInt(value)})
    }
    
    const submitReview = async (event) => {
        event.preventDefault();
        try {
             await API.createReview(id, venueReview)
            setModalMsg('Review created!');
            handleShow();
        } catch(err){
            console.log(err)
        }
    }

    return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
    <div className="formcontent p-2">
    <h1 className="text-center">Create Venue Review</h1>
    <form>
        <div className="form-group d-flex flex-column">
            <label htmlFor="venueName">Venue Name:</label>
            <select className="form-select" id="venue" name="venue" onChange={createReview}>
            <option>Select Venue</option>
            {allVenues.map(venue => (<VenueSelector key={venue._id} venue={venue}/>))}
            </select>
        </div>
        <div className="form-group">
        <label htmlFor="venueReview">Review:</label>
        <textarea className="form-control" id="reviewText" name="reviewText" maxlength={250} onChange={createReview} rows="3"></textarea>
        </div>        
        <div className="form-group d-flex flex-column">
        <label htmlFor="venueRating">Rate Venue (1-5):</label>
        <select id="rating" name="rating" onChange={createReview}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
        </select>
        </div>
        <button type="submit" value={"Submit"} onClick={submitReview} className="artistCreateButton">Submit</button>
        </form>
        <Modal show={show} handleClose={handleClose} error={modalMsg} title={true} />
        </div>
    </div>
    
     )
}

export default CreateReview;