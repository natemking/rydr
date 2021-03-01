import React from 'react';

const ArtistLinkInput = ({ links, linkId  }) => {
   console.log(links);
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
        </div>
    );
}
 
export default ArtistLinkInput;