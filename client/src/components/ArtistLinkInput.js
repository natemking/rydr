import React from 'react';

const ArtistLinkInput = ({ links, linkId, remove }) => {

    // On click remove user link from DB and DOM
    const handleOnClick = (e) => {
        remove(e.target.id); 
    }

    return (
        <div className='d-flex flex-row mb-3'>
            <input 
                type='text' 
                className='form-control' 
                id={`siteUrl${linkId}`}
                placeholder='Add Url Here' 
                name='siteUrl' 
                defaultValue={ links.length >= linkId + 1 ? links[linkId].siteUrl : null } 
            />
            <select 
                className='artistUpdateButton' 
                id={`linkSelection${linkId}`} 
                defaultValue={ links.length >= linkId + 1 ? links[linkId].siteName : 'DEFAULT' }>
                    <option value='DEFAULT' disabled>Link Type</option>
                    <option value='Facebook'>Facebook</option>
                    <option value='Instagram'>Instagram</option>
                    <option value='Bandcamp'>Bandcamp</option>
                    <option value='Youtube'>Youtube</option>
                    <option value='Website'>Website</option>
            </select>
            { !window.location.hash.includes('updateartist') ? 
                <span>
                    <i className="fa fa-times" aria-hidden="true" id={linkId} onClick={ handleOnClick } />
                </span> : null
            }
        </div>
    );
}
 
export default ArtistLinkInput;