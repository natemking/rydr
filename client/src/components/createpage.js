import React, {} from 'react';



    return (

    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
    <div className="formcontent p-2">
    <h1 className="text-center">Create Your Artist Profile</h1>
    <form>
        <div className="form-group">
            <label for="artistname">Name:</label>
            <input type="text" className="form-control" id="artistname" aria-describedby="artistNameHelp" placeholder="Enter Name"></input>
        </div>
        <div className="form-group">
            <label for="artistLocation">Location (City, State):</label>
            <input type="text" className="form-control" id="bandLocation" aria-describedby="artistLocation" placeholder="Enter Location"></input>
        </div>
        <div className="form-group">
        <label for="artistBio">Description:</label>
        <textarea className="form-control" id="artistBio" rows="3"></textarea>
        </div>
        <div className="form-group">
            <label for="artistLinks">Outside Link:</label>
            <input type="text" className="form-control" id="artistLinks" aria-describedby="socialMediaHelp" placeholder="Enter Artist/Band Link"></input>
        </div>
        <div className="form-group">
            <label for="artistContact">Contact Email:</label>
            <input type="email" className="form-control" id="artistContact" aria-describedby="socialMediaHelp" placeholder="Enter Contact Email"></input>
        </div>
        <div className="form-group">
            <label for="artistUsername">Create Username:</label>
            <input type="email" className="form-control" id="artistUsername" aria-describedby="emailHelp" placeholder="Enter email"></input>
        </div>
        <div className="form-group">
            <label for="artistPassword">Create Password:</label>
            <input type="password" className="form-control" id="artistPassword" placeholder="Password"></input>
        </div>
        <div className="form-group">
        <label for="bandAvatar">Upload an Avatar</label>
        <input type="file" className="form-control-file" id="bandAvatar"></input>
        </div>
        <button type="submit" className="artistCreateButton">Submit</button>
        </form>
        </div>
    </div>
    
     )
}
    
export default CreatePage;