import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ArtistLinkInput from './ArtistLinkInput';
import API from '../utils/API';
import Modal from './Modal';

const ArtistEdit = ({ artist, create, handleEdit, id }) => {
    // useHistory hook for routing
    let history = useHistory();
    // State for artist object from DB
    const [editArtist, setEditArtist] = useState(artist);
    // State of page for profile create vs profile edit
    const [createPage, setCreatePage] = useState(false);
    // State for bands links   
    const [addLink, setAddLink] = useState([]);
    // State for modal error message
    const [modalMsg, setModalMsg] = useState('');
    // State for modal visibility
    const [show, setShow] = useState(false);
    // State for the linkId to be deleted
    const [deleteId, setDeleteId] = useState(null);

  
    // If it is the create profile page, create state is set to true
    useEffect(() => {
        window.location.hash.includes('updateartist') ? setCreatePage(true) : setCreatePage(false);
    }, []);

    // For the 'Create Profile' screen. Get the artist data and set newArtist state
    useEffect(() => {
        if (createPage){
            (async () => {
                try {
                    const artist = await API.getBand(id);
                    setEditArtist(artist.data);
                } catch (err) { console.error(err) }
            })();
        }
    }, [createPage]);
  
    // Render Input fields for band links that are stored in DB
    useEffect(() => {
        let linkInputs = [...addLink]
        if (artist && !show) {
            editArtist.bandLinks.forEach((link, i) => {
                linkInputs.push(
                    <ArtistLinkInput
                        key={i}
                        linkId={i}
                        links={artist.bandLinks}
                        remove={deleteLinkInput}
                    />
                );
            });
            setAddLink(linkInputs);  
        }        
    },[]);
    
    // Update state of link list when delete id changes
    useEffect(() => {
        if (deleteId !== null){
            const deleteLink = addLink.filter(link => link.key !== deleteId);
            const updatedArtist = editArtist;

            updatedArtist.bandLinks.splice(deleteId, 1);
            setEditArtist(updatedArtist);

            return addLink.length > 0 ? setAddLink(deleteLink) : null;
        }
    }, [deleteId]);
    
    // Handle input change
    const handleChange = (e) => {
        setEditArtist({
            ...editArtist,
            [e.target.name]: e.target.value,
        });
    }

    // Render a link input field
    const addLinkInput = () => {    
            setAddLink([...addLink, 
                <ArtistLinkInput 
                    key={ addLink.length } 
                    linkId={ addLink.length } 
                    links={ createPage ? [] : editArtist.bandLinks } 
                    remove={ deleteLinkInput }
                />
            ])
    }

    // Get the linkInput id to be deleted and set it to state
    const deleteLinkInput = (id) => {
        setDeleteId(id);
    }
   
    // Function to update the artists info in the DB
    const updateArtist = async () => {
        try {
            await API.updateBandData(editArtist._id, editArtist);
        } catch (err) { console.log(err) }
    }

    // Function to trim off http:// or https:// from a users link input
    const trimURL = (url) => {
        const regex = (/^(http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gim);

        url = url.toLowerCase().trim();

        return regex.test(url) ? url.replace(/^(http:\/\/|https:\/\/)/, '') : url;
    }

    // Function to retrieve input values for the new link and set that to artist state
    const editLink = () => {
        if (editArtist) { editArtist.bandLinks = [] }
        
        addLink.forEach((link,i )=> {
            const linkValue = document.getElementById(`siteUrl${i}`).value;
            const linkType = document.getElementById(`linkSelection${i}`).value;
            const newArtist = editArtist;
            
            if (linkValue !== '' && linkType !== 'DEFAULT') {

                newArtist.bandLinks.push({
                    siteName: linkType,
                    siteUrl: trimURL(linkValue)
                });
                setEditArtist({ ...editArtist, newArtist });
            }
        });
    }

    // Initializes function to update the artists info 
    const handleBtnSubmit = (event) => {
        event.preventDefault();
        editLink();
        updateArtist();
        localStorage.setItem("id", `${id}`)
        setModalMsg(`${editArtist.bandName}'s profile was updated`);
        handleShow();
    }

    // Modal functions for closing and showing
    const handleClose = () => { 
        setShow(false); 
        createPage ? history.push(`/bandpage/${id}`) : handleEdit()
    };
    const handleShow = () => setShow(true);

    // Render edit form
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
                            value={ artist ? editArtist.bandBio: undefined } 
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
                        value={ artist ? editArtist.contact : undefined }
                        onChange={ handleChange } 
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
                        <i className="fa fa-plus" aria-hidden="true" onClick={ addLinkInput }></i>
                        Add a link
                    </p>
                </span>
    
                <button type="submit" value={"Submit"} className="artistUpdateButton" onClick={ handleBtnSubmit }>
                    Save
                </button>
                <button type="submit" value={"Cancel"} className="artistUpdateButton ml-3" onClick={ handleClose }>
                    Cancel
                </button>
                    
            </form>

            <Modal 
                show={ show } 
                handleClose={ handleClose } 
                error={ modalMsg } 
                title={ true }
            />
        </>
    );
}
 
export default ArtistEdit;