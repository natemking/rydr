import React, { useState, useEffect } from 'react';
import ArtistLinkInput from './ArtistLinkInput';

const ArtistEdit = ({ artist, renderBandLinks, create }) => {
    // State of artist object from DB
    const [editArtist, setEditArtist] = useState(artist);   
    const [addLink, setAddLink] = useState([<ArtistLinkInput />]);

   const handleChange = (e) => {
        setEditArtist({
            ...editArtist,
            [e.target.name]: e.target.value,
            // id: match.params.id
        });
    }
    console.log(editArtist);

    const addLinkInput = () => {
        setAddLink([...addLink, <ArtistLinkInput key={ Date.now() }/>])
    }

    return (
        <form>
            { create ? null :
                <>
                    <h1>
                        { artist.bandName }
                    </h1>
        
                    <div className='form-group'>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="bandLocation"  
                            name="location" 
                            value={ editArtist.location }
                            onChange={handleChange}
                        />
                    </div>
                </>
            }

            <div className='form-group'>
                <h3>
                    <u>Bio:</u>
                </h3>
                <div className="d-flex bandbio">
                    <textarea 
                        className="form-control" 
                        id="artistBio" 
                        rows="3" 
                        value={ artist ? editArtist.bandBio: null } 
                        onChange={handleChange} 
                        name="bandBio" 
                    />
                </div>
            </div>

            <div className='form-group'>
                <p>
                    <u>Contact Email:</u>
                </p>
                <input 
                    type="email" 
                    className="form-control" 
                    id="artistContact" 
                    placeholder="Add Contact Email" 
                    name="contact" 
                    value={artist ? editArtist.contact : null}
                    onChange={handleChange} 
                />
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