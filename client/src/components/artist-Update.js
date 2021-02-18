import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import CloudinaryWidget from './CloudinaryWidget';
import API from '../utils/API';
import Modal from './Modal';
import ArtistLinks from './artist-Links';


const UpdateArtist = ({ match }) => {
    // useHistory hook for routing
    let history = useHistory();
    // State of artist object from DB
    const [artist, setArtist] = useState();
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
        fetchArtist();
    }, [match.params.id]);

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

    // Function to trim off http:// or https:// from a users link input
    const trimURL = (url) => {
        const regex = (/^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gim );

        url = url.toLowerCase().trim();

        return regex.test(url) ? url.replace(/^(http:\/\/|https:\/\/)/, '') : url;
    }
    
    // Function to retrieve input values for the new link and set that to artist state
    const addLink = () => {
        let newArtist = artist
        newArtist.bandLinks.push({
            siteName: document.getElementById('linkSelection').value,
            siteUrl: trimURL(document.getElementById('siteUrl').value)
        })
        setArtist({
            ...artist,
            newArtist});
    }
    
    // If band links exist render them
    const renderBandLinks = () => {
        if (artist) { 
            if (artist.bandLinks.length > 0) {
                return (<ArtistLinks artist={ artist } title={ 'Delete' }/>) 
            }
        }
    }

    // Render Update artist profile screen
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <div className="formcontent p-2">
                <h1 className="text-center">
                    Update Your Artist Profile
                </h1>

                <CloudinaryWidget onSuccess={ handleCloudResults } />
                <h4 style={{ color: 'white', display: msgToggle }}>
                    Image uploaded!
                </h4>

                <form>
                    <div className="form-group">
                        <label htmlFor="artistLocation">
                            Location (City, State):
                        </label>
                        <input type="text" className="form-control" id="bandLocation" placeholder="Update Location" name="location" onChange={ handleChange } />
                    </div>

                    <div className="form-group">
                        <label htmlFor="artistContact">
                            Contact Email:
                        </label>
                        <input type="email" className="form-control" id="artistContact" placeholder="Update Contact Email" name="contact" onChange={ handleChange } />
                    </div>

                    <div className="form-group">
                        <label htmlFor="artistBio">
                            Bio:
                        </label>
                        <textarea className="form-control" id="artistBio" rows="3" onChange={ handleChange } name="bandBio" />
                    </div>

                    <div className="form-group">
                        <div className="">
                            <label htmlFor="artistLinks">Add A Link:</label>
                            <input type="text" className="form-control" id="siteUrl" aria-describedby="socialMediaHelp" placeholder="Add Url Here" name="siteUrl" ></input>
                            <select className="artistUpdateButton" id="linkSelection">
                                <option selected disabled>Choose A Link Type</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Bandcamp">Bandcamp</option>
                                <option value="Youtube">Youtube</option>
                                <option value="Website">Website</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        { renderBandLinks() }
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