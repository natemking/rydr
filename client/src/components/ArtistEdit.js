import React from 'react';

const ArtistEdit = ({ artist, renderBandLinks }) => {
    return (
        <form>
            <h1>
                {artist.bandName}
                
            </h1>

            
            <div className='form-group'>
                <input type="text" className="form-control" id="bandLocation"  name="location"  />
            </div>


            <div className='form-group'>
                <h3>
                    <u>Bio:</u>
                </h3>
                <div className="d-flex bandbio">
                    <textarea className="form-control" id="artistBio" rows="3"  name="bandBio" />
                </div>
            </div>

            <div className='form-group'>
                <p>
                    <u>Contact Info:</u>
                    <br />
                </p>
                <input type="email" className="form-control" id="artistContact"  name="contact"  />
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


            { renderBandLinks }
          
            <button className="artistUpdateButton">Save</button>
                
        </form>
    );
}
 
export default ArtistEdit;