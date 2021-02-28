import React, { useState, useEffect } from 'react';
import ArtistLinkInput from './ArtistLinkInput';

const ArtistEdit = ({ artist, renderBandLinks, create }) => {   
    const [addLink, setAddLink] = useState([<ArtistLinkInput />]);
    
    const addLinkInput = () => {
        setAddLink([...addLink, <ArtistLinkInput />])
    }

    return (
        <form>
            { create ? null :
                <>
                    <h1>
                        { artist.bandName }
                    </h1>
        
                    <div className='form-group'>
                        <input type="text" className="form-control" id="bandLocation"  name="location"  />
                    </div>
                </>
            }

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
                <div>
                    <label htmlFor="artistLinks">Add A Link:</label>
                    { addLink.map(input => (input)) }
                </div>
            </div>
        
            <span>
                <p>
                    <i className="fa fa-plus" aria-hidden="true" onClick={addLinkInput}></i>
                    Add another link
                </p>
            </span>

            { renderBandLinks }
            
            <button className="artistUpdateButton">Save</button>
                
        </form>
    );
}
 
export default ArtistEdit;