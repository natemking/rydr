import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import API from '../utils/API';
import Modal from './Modal';

const CreateVenue = () => {
    const [address] = useState([])
    const [newVenueName, setNewVenueName] = useState("")
    const [newVenue, setNewVenue] = useState({
            "venueName": newVenueName,
            "venueAddress": address
    })
    // State for modal error message
    const [modalMsg, setModalMsg] = useState('');
    // State for modal visibility
    const [show, setShow] = useState(false);
    let history = useHistory();

    const handleClose = () => { setShow(false); history.push("/venuepage") };
    const handleShow = () => setShow(true);


    const createVenue = (event) => {
        const target = event.target.name
        const value = event.target.value
        setNewVenue({...newVenue, [target]: value})
    }
    
    const postNewVenue = async (event) => {
        event.preventDefault();
        try {
             await API.createVenueByName(newVenue.venueName, newVenue)
            setModalMsg(newVenue.venueName + ' was created');
            handleShow();
        }catch(err){
            console.log(err)
        }
    }

    const createVenueName = (event) => {
        const value = event.target.value
        setNewVenueName(value)
    }

    const createAddress = (event) => {
        const value = event.target.value
        address.push(value)
    }

    return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
    <div className="formcontent p-2">
    <h1 className="text-center">Create Venue Review</h1>
    <form>
        <div className="form-group d-flex flex-column">
            <label htmlFor="venueName">Venue Name:</label>
            <input type="text" id="venueName" name="venueName" onChange={createVenueName && createVenue}></input>
        </div>
        <div className="form-group">
        <label htmlFor="venueAddress">Venue Address:</label>
        <div className="d-flex flex-column">
        <input type="text" id="venueAddress" name="0" onChange={createAddress} placeholder="Street Address 1"></input>
        <input type="text" id="venueAddress" name="1" onChange={createAddress} placeholder="Street Address 2"></input>
        <input type="text" id="venueAddress" name="2" onChange={createAddress} placeholder="City, State"></input>
        </div>
        </div>
        <button type="submit" value={"Submit"} className="artistCreateButton" onClick={postNewVenue}>Submit</button>
        </form>
            <Modal show={show} handleClose={handleClose} error={modalMsg} title={true} />
        </div>
    </div>
    
     )
}

export default CreateVenue;