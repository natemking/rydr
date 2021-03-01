import React, { useState, useEffect, useRef } from 'react';
import ArtistLinkInput from './ArtistLinkInput';
import API from '../utils/API';
import Modal from './Modal';

const ArtistEdit = ({ artist, renderBandLinks, create, handleEdit }) => {
    // State of artist object from DB
    const [editArtist, setEditArtist] = useState(artist);   
    const [addLink, setAddLink] = useState([]);
    // State for modal error message
    const [modalMsg, setModalMsg] = useState('');
    // State for modal visibility
    const [show, setShow] = useState(false);

    

    useEffect(() => {
        let linkInputs = [...addLink]
        artist.bandLinks.forEach((link, i) => {
            linkInputs.push(<ArtistLinkInput key={ i } linkId={ i } links={ artist.bandLinks } />)
        })    
        setAddLink(linkInputs)  
    },[]);
   
   console.log(addLink);
    
   const handleChange = (e) => {
        setEditArtist({
            ...editArtist,
            [e.target.name]: e.target.value,
            // id: match.params.id
        });
    }

    const addLinkInput = () => {
        setAddLink([...addLink, <ArtistLinkInput key={addLink.length} linkId={ addLink.length } links={ editArtist.bandLinks } />])
    }

    // Modal functions for closing and showing
    const handleClose = () => { setShow(false); handleEdit()  };
    const handleShow = () => setShow(true);

    // Function to update the artists info in the DB
    const updateArtist = async () => {
        try {
            await API.updateBandData(editArtist._id, editArtist);
        } catch (err) { console.log(err) }
    }

    // Initializes function to update the artists info
    const handleBtnSubmit = (event) => {
        event.preventDefault();
        editLink();
        updateArtist();
        setModalMsg(`${artist.bandName}'s profile was updated`);
        handleShow();
    }

    // Function to trim off http:// or https:// from a users link input
    const trimURL = (url) => {
        const regex = (/^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gim);

        url = url.toLowerCase().trim();

        return regex.test(url) ? url.replace(/^(http:\/\/|https:\/\/)/, '') : url;
    }

    // Function to retrieve input values for the new link and set that to artist state
    const editLink = () => {
        editArtist.bandLinks = [];

        addLink.forEach((link,i )=> {
            const linkValue = document.getElementById(`siteUrl${i}`).value;
            const linkType = document.getElementById(`linkSelection${i}`).value;
            let newArtist = editArtist;
            
            if (linkValue !== '' && linkType !== 'Link Type') {

                newArtist.bandLinks.push({
                    siteName: linkType,
                    siteUrl: trimURL(linkValue)
                });
                setEditArtist({ ...editArtist, newArtist });
            }
        });

        // if (linkValue !== '' && linkType !== 'Link Type') {

        //     newArtist.bandLinks.push({
        //         siteName: linkType,
        //         siteUrl: trimURL(linkValue)
        //     });
        //     setEditArtist({ ...editArtist, newArtist });
        // }
    }

 

    return (
        <>
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
                                onChange={ handleChange }
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
    
                { React.cloneElement(renderBandLinks, { updateArtist: 'test' }) }
                
                {/* { renderBandLinks } */}

                <button type="submit" value={"Submit"} className="artistUpdateButton" onClick={handleBtnSubmit}>
                    Save
                </button>
                    
            </form>

            <Modal show={ show } handleClose={ handleClose } error={ modalMsg } title={ true } />
        </>
    );
}
 
export default ArtistEdit;