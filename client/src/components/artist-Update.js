import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import CloudinaryWidget from './CloudinaryWidget';
import API from '../utils/API'
import { AuthContext } from '../Context/AuthorizationContext';

const UpdateArtist = ( {match} ) => {
    const {id} = useContext(AuthContext)
    let history = useHistory();
    // State of artist link to add to DB
    const [links, setLinks] = useState([]);
    // Array to store new artist link
    const newLinks = [];
    const [artist, setArtist] = useState([]);
    // State of artist object from DB
    const [artistId, setArtistId] = useState('');
    // State of results from Cloudinary after a user uploads photo
    const [cloudResults, setCloudResults] = useState('');
    // State of updated artist info to be stored in the DB
    const [updatedArtist, setUpdatedArtist] = useState({
        bandId: '',
        bandBio: '',
        location: '',
        bandImg: cloudResults,
        bandLinks: newLinks,
        contact: ''
    });

    // State of img upload status
    const [msgToggle, setMsgToggle] = useState('none')
    

    console.log(id)

    // Retrieves artist data from the database to be used
    useEffect(() => {
        const fetchArtist = async () => {
            const result = await API.getUser(match.params.id)
            const userArtist = result.data
            setArtist(userArtist)
            console.log(artist)
        }
        fetchArtist()
    }, []);

    // Initializes function to update the artists info
    const handleBtnSubmit = async (event) => {
        event.preventDefault();
        try {
            await addLink();
            updateArtist();
        } catch (err) { console.log(err) }
    }

    // Function to update the artists info in the DB
    const updateArtist = async () => {
        try {
            await API.updateUserData(id, updatedArtist)
            alert(updatedArtist.bandName + ' was updated')
        }
        catch (err) {
            console.log(err)
        }
    }

    // Cloudinary data state handler
    const handleCloudResults = (results) => {
        setCloudResults(results);
        setMsgToggle('block');
    }

    // Sets the state of updatedArtist to match user input 
    function handleChange(event) {
        console.log(artist)
        getArtistId();
        const value = event.target.value
        setUpdatedArtist({
            ...updatedArtist,
            [event.target.name]: value,
            bandId: artistId,
        })
    }

    // Sets state for artist id 
    const getArtistId = async () => {
        try {
            await setArtistId(id);
        } catch (err) { console.log(err) }
    }

    // Function to grab values of new artist link input and set them to state
    function createLink(event) {
        const value = event.target.value
        setLinks({
            ...links,
            [event.target.name]: value
        })
    }
    // Function to push the new artist link into the newlinks array and set that to updatedArtist state
    const addLink = () => {
        newLinks.push(links)
        console.log(newLinks)
        setUpdatedArtist({
            ...updatedArtist,
            bandLinks: newLinks
        })
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <div className="formcontent p-2">
                <h1 className="text-center">Update Your Artist Profile</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="artistLocation">Location (City, State):</label>
                        <input type="text" className="form-control" id="bandLocation" aria-describedby="artistLocation" placeholder="Update Location" name="location" onChange={handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="artistContact">Contact Email:</label>
                        <input type="email" className="form-control" id="artistContact" aria-describedby="socialMediaHelp" placeholder="Update Contact Email" name="contact" onChange={handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="artistBio">Bio:</label>
                        <textarea className="form-control" id="artistBio" rows="3" onChange={handleChange} name="bandBio"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="artistLinks">Outside Link:</label>
                        <input type="text" className="form-control" id="siteUrl" aria-describedby="socialMediaHelp" placeholder="Add Artist/Band Link" name="siteUrl" onChange={createLink}></input>
                        <label htmlFor="artistLinks">Outside Link Name:</label>
                        <input type="text" className="form-control" id="siteName" aria-describedby="socialMediaHelp" placeholder="Enter A Name For Artist/Band Link" name="siteName" onChange={createLink}></input>
                    </div>
                    <div className="form-group">
                        <CloudinaryWidget onSuccess={handleCloudResults} />
                        <h4 style={{ color: 'white', display: msgToggle }}>Image uploaded!</h4>
                    </div>
                    <button type="submit" value={"Submit"} className="artistUpdateButton" onClick={handleBtnSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateArtist;