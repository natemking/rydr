import React, { useState } from 'react';
import CloudinaryWidget from './CloudinaryWidget';
import ReCAPTCHA from "react-google-recaptcha";
import API from '../utils/API'



const CreateArtist = () => {
    const [artist, setArtist] = useState([{
        "artistName": "",
        "artistLocation": ""
    }]);
    // State of results from Cloudinary after a user uploads photo
    const [cloudResults, setCloudResults] = useState('');
    // State of btn disable for reCAPTCHA verification
    const [btnDisable, setBtnDisable] = useState(true);

    const createArtist = (event) => {
        const target = event.target.name
        const value = event.target.value

        setArtist({[target]: value})
    }
    
    const submitArtist = (event) => {
        console.log(artist)
        event.preventDefault();
    }

    // Cloudinary data state handler
    const handleCloudResults = (results) => {
        setCloudResults(results)
    }    
    // URL Path from results - cloudResults.info.url;

    // Handle submit btn disable and POST user token to Google for reCaptcha verification
    const captchaOnChange = (responseToken) => {
        setBtnDisable(false);
        API.recaptchaUserVerify(responseToken);
    }
    
    return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
    <div className="formcontent p-2">
    <h1 className="text-center">Create Your Artist Profile</h1>
    <form onSubmit={submitArtist}>
        <div className="form-group">
            <label htmlFor="artistname">Name:</label>
            <input type="text" className="form-control" id="artistname" aria-describedby="artistNameHelp" placeholder="Enter Name" name="artistName" onChange={createArtist}></input>
        </div>
        <div className="form-group">
            <label htmlFor="artistLocation">Location (City, State):</label>
            <input type="text" className="form-control" id="bandLocation" aria-describedby="artistLocation" placeholder="Enter Location" name="artistLocation" onChange={createArtist}></input>
        </div>
        <div className="form-group">
        <label htmlFor="artistBio">Description:</label>
        <textarea className="form-control" id="artistBio" rows="3"></textarea>
        </div>
        <div className="form-group">
            <label htmlFor="artistLinks">Outside Link:</label>
            <input type="text" className="form-control" id="artistLinks" aria-describedby="socialMediaHelp" placeholder="Enter Artist/Band Link"></input>
        </div>
        <div className="form-group">
            <label htmlFor="artistContact">Contact Email:</label>
            <input type="email" className="form-control" id="artistContact" aria-describedby="socialMediaHelp" placeholder="Enter Contact Email"></input>
        </div>
        <div className="form-group">
            <label htmlFor="artistUsername">Create Username:</label>
            <input type="email" className="form-control" id="artistUsername" aria-describedby="emailHelp" placeholder="Enter email"></input>
        </div>
        <div className="form-group">
            <label htmlFor="artistPassword">Create Password:</label>
            <input type="password" className="form-control" id="artistPassword" placeholder="Password"></input>
        </div>
        <div className="form-group">
        <label htmlFor="bandAvatar">Upload an Avatar</label>
        {/* <input type="file" className="form-control-file" id="bandAvatar"></input> */}
            <CloudinaryWidget onSuccess={ handleCloudResults }/>
        </div>
            <ReCAPTCHA
                sitekey={ process.env.REACT_APP_GOOGLE_RECAP_SITE_KEY }
                render='explicit'
                onChange={ captchaOnChange }
            />,
        <button type="submit" value={"Submit"} className="artistCreateButton" disabled={ btnDisable }>Submit</button>
        </form>
        </div>
    </div>
    
     )
}

export default CreateArtist;