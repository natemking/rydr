import React from 'react';

const ArtistLinkInput = ({ linkId }) => {
   
    return (
        <div className='d-flex flex-row mb-3'>
            <input type='text' className='form-control' id={`siteUrl${linkId}`} aria-describedby='socialMediaHelp' placeholder='Add Url Here' name='siteUrl' ></input>
            <select className='artistUpdateButton' id={`linkSelection${linkId}`} defaultValue={'DEFAULT'}>
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