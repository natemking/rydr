import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import CloudinaryWidget from './CloudinaryWidget';
import API from '../utils/API';
import Modal from './Modal'


const UpdateArtist = ({ match }) => {
    // useHistory hook for routing
    let history = useHistory();

    // State of artist object from DB
    const [artist, setArtist] = useState('');
    // State of artist link to add to DB
    const [links, setLinks] = useState([]);
    // Array to store new artist link
    const newLinks = [];
    // State of img upload status message
    const [msgToggle, setMsgToggle] = useState('none')
    // State for modal error message
    const [modalMsg, setModalMsg] = useState('');
    // State for modal visibility
    const [show, setShow] = useState(false);


    // Retrieves artist data from the database to be used
    useEffect(() => {
        const fetchArtist = async () => {
            const result = await API.getBand(match.params.id)
            const userArtist = result.data
            setArtist(userArtist)
        }
        fetchArtist()
    }, []);

    // Modal functions for closing and showing
    const handleClose = () => { setShow(false); history.push(`/bandpage/${match.params.id}`) };
    const handleShow = () => setShow(true);

    // Sets the state of updatedArtist to match user input 
    function handleChange(event) {
        setArtist({ 
            ...artist, 
            [event.target.name]: event.target.value, 
            id: match.params.id 
        });
    }

    // Cloudinary widget, send url results to the artist state
    const handleCloudResults = (results) => {
        setArtist({
            ...artist,
            bandImg: results.info.url
        });
        setMsgToggle('block');
    }  

    // Function to update the artists info in the DB
    const updateArtist = async () => {
        try {
            await API.updateBandData(match.params.id, artist);
        } catch (err) { console.log(err) }
    }

    // Initializes function to update the artists info
    const handleBtnSubmit = (event) => {
        event.preventDefault();    
        addLink();
        updateArtist();
        setModalMsg(`${artist.bandName}'s profile was updated`);
        handleShow();
    } 
      
    // Function to grab values of new artist link input and set them to state
    function createLink(event) {
        const value = event.target.value
        setLinks({
            ...links,
            [event.target.name]: value
        })
        console.log(links)
    }

    // Function to push the new artist link into the newlinks array and set that to updatedArtist state
    const addLink = () => {
            newLinks.push(links)  
            console.log(newLinks) 
            setArtist({
                ...artist,
                bandLinks : newLinks
            })
    } 

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <div className="formcontent p-2">
                <h1 className="text-center">
                    Update Your Artist Profile
                </h1>

                <CloudinaryWidget onSuccess={handleCloudResults} />
                <h4 style={{ color: 'white', display: msgToggle }}>
                    Image uploaded!
                </h4>

                <form>
                    <div className="form-group">
                        <label htmlFor="artistLocation">
                            Location (City, State):
                        </label>
                        <input type="text" className="form-control" id="bandLocation"  placeholder="Update Location" name="location" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="artistContact">
                            Contact Email:
                        </label>
                        <input type="email" className="form-control" id="artistContact" placeholder="Update Contact Email" name="contact" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="artistBio">
                            Bio:
                        </label>
                        <textarea className="form-control" id="artistBio" rows="3" onChange={handleChange} name="bandBio" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="artistLinks">
                            Outside Link:
                        </label>
                        <input type="text" className="form-control" id="siteUrl" placeholder="Add Artist/Band Link" name="siteUrl"  onChange={createLink} />
                        <label htmlFor="artistLinks">
                            Outside Link Name:
                        </label>
                        <input type="text" className="form-control" id="siteName"  placeholder="Enter A Name For Artist/Band Link" name="siteName" onChange={createLink} />
                    </div>

                    <button type="submit" value={ "Submit" } className="artistUpdateButton" onClick={ handleBtnSubmit }>
                        Submit
                    </button>
                </form>
                <Modal show={ show } handleClose={ handleClose } error={ modalMsg } title={ true } />
            </div>
        </div>
    )
}

export default UpdateArtist;