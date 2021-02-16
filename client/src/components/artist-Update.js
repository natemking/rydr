import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import CloudinaryWidget from './CloudinaryWidget';
import ReCAPTCHA from "react-google-recaptcha";
import API from '../utils/API'



const UpdateArtist = ({artist}) => {
    let history = useHistory();
     // State of results from Cloudinary after a user uploads photo
    const [cloudResults, setCloudResults] = useState('');
    // State of btn disable for reCAPTCHA verification
    const [btnDisable, setBtnDisable] = useState(true);
    const [links] = useState([]);
    const [updatedArtist, setUpdatedArtist] = useState([{
        id: artist._id,
        bandBio: '',
        location: '',
        bandImg: cloudResults,
        bandLinks: links,
        contact: ''
    }]);
   

    const updateArtist = async (event) => {
      event.preventDefault();
        try{
            await API.updateUserData(updatedArtist)
            alert('artist was updated')
            history.push('/bandpage')
        }catch(err) {
            console.log(err)
        }
    }

    // Cloudinary data state handler
    const handleCloudResults = (results) => {
        setCloudResults(results)
    }    
   
    const handleBtnSubmit = (event) => {
        event.preventDefault();
        updateArtist()

    }

    function handleChange(event) {
        const value = event.target.value
        setUpdatedArtist({
            ...updatedArtist,
            [event.target.name]: value
        })
    }

    const createLink = (event) => {
        const value = event.target.value
        links.push(value)
    }
    

    
    return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
    <div className="formcontent p-2">
    <h1 className="text-center">Update Your Artist Profile</h1>
    <form>
        <div className="form-group">
            <label htmlFor="artistLocation">Location (City, State):</label>
            <input type="text" className="form-control" id="bandLocation" aria-describedby="artistLocation" placeholder="Enter Location" name="bandLocation" onChange={handleChange}></input>
        </div>
        <div className="form-group">
        <label htmlFor="artistBio">Bio:</label>
        <textarea className="form-control" id="artistBio" rows="3" onChange={handleChange} name="bandBio"></textarea>
        </div>
        <div className="form-group">
            <label htmlFor="artistLinks">Outside Link:</label>
            <input type="text" className="form-control" id="artistLinks" aria-describedby="socialMediaHelp" placeholder="Enter Artist/Band Link" name="bandLinks" onChange={createLink}></input>
        </div>
        <div className="form-group">
            <label htmlFor="artistContact">Contact Email:</label>
            <input type="email" className="form-control" id="artistContact" aria-describedby="socialMediaHelp" placeholder="Enter Contact Email" 
            name="bandContact" onChange={handleChange}></input>
        </div>
        <div className="form-group">
        <label htmlFor="bandAvatar">Upload an Avatar</label>
        {/* <input type="file" className="form-control-file" id="bandAvatar"></input> */}
            <CloudinaryWidget onSuccess={ handleCloudResults }/>
        </div>
        <button type="submit" value={"Submit"} className="artistCreateButton" disabled={ btnDisable } onClick={handleBtnSubmit}>Submit</button>
        </form>
        </div>
    </div>
     )
}

export default UpdateArtist;