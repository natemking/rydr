import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import CloudinaryWidget from './CloudinaryWidget';
import API from '../utils/API'



const UpdateArtist = () => {
    let history = useHistory();
    const [links, setLinks] = useState([{
        siteName: '',
        siteUrl: ''
    }]);
    const [artist, setArtist] = useState([]);
    // State of artist object from DB
    const [artistId, setArtistId] = useState('');
    // State of results from Cloudinary after a user uploads photo
    const [cloudResults, setCloudResults] = useState('');
    // State of updated artist info to be stored in the DB
    const [updatedArtist, setUpdatedArtist] = useState({
        id: artistId,
        bandBio: '',
        location: '',
        bandImg: cloudResults,
        bandLinks: [],
        contact: ''
    });
    // State of img upload status
    const [msgToggle, setMsgToggle] = useState('none')

    // Retrieves artist data from the database to be used
    useEffect(() => {
        const fetchArtist = async () => {
            const result = await API.getUser("60288184a737655090c921ba")
            const userArtist = result.data
            setArtist(userArtist)
        }
        fetchArtist()
    }, []);

    // Initializes function to update the artists info
    const handleBtnSubmit = (event) => {
        event.preventDefault();
        console.log("handleBtnSubmit");
        updateArtist();
    }

    // Function to update the artists info in the DB
    const updateArtist = async () => {
        try {
            await API.updateBand(artistId, updatedArtist)
            alert(updatedArtist.bandName + ' was updated')
            history.push('/bandpage')
        } catch (err) {
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
        getArtistId();
        const value = event.target.value
        setUpdatedArtist({
            ...updatedArtist,
            [event.target.name]: value,
            id: artistId,
            bandLinks: links
        })
    }

    // Sets state for artist id 
    const getArtistId = async () => {
        try {
            await setArtistId(artist._id);
        } catch (err) { console.log(err) }
    }

    // Function to push the new url into the links array
    function createLink(event) {
        const value = event.target.value
        setLinks({
            ...links,
            [event.target.name]: value
        })
        console.log(links)
    }

    // const createLink = (event) => {
    //         const value = event.target.value
    //         links.push(value)  
    //         console.log(links) 
    //     } 

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
                        <input type="text" className="form-control" id="artistLinks" aria-describedby="socialMediaHelp" placeholder="Add Artist/Band Link" name="siteUrl" onChange={createLink} ></input>
                        <label htmlFor="artistLinks">Outside Link Name:</label>
                        <input type="text" className="form-control" id="artistLinks" aria-describedby="socialMediaHelp" placeholder="Enter A Name For Artist/Band Link" name="siteName" onChange={createLink}></input>
                        {/* <button type="submit" value={"Submit"} className="artistUpdateButton" >Add Url</button> */}
                    </div>
                    <div className="form-group">
                        {/* <input type="file" className="form-control-file" id="bandAvatar"></input> */}
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