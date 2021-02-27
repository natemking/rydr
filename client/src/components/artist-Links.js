import React from 'react';
import API from '../utils/API'



const ArtistLinks = ({ artist, isLoading, title, id, edit }) => {
    const userId = localStorage.getItem("id");
    const updateBandUrl = `/updateartist/${id}`;
    const url = window.location.href;
    const bandId = url.substring(url.lastIndexOf('/') + 1);
    // On click remove user link from DB and DOM
    const handleOnClick = (e) => {
        API.deleteLink({bandId:artist._id, id:e.target.id});
        document.getElementById(e.target.id).parentNode.parentNode.remove();
    }

    // Iterate over band links for display. 
    const links = artist.bandLinks.map((link) => (
        <li key={link._id} className='artistLink__li'>
            <a href={`https://${link.siteUrl}`} target='_blank' rel='noreferrer'>
                {link.siteName}
            </a>
            { !edit ? null :
            <span>
                <i className="fa fa-times" aria-hidden="true" id={link._id} onClick={handleOnClick}></i>
            </span>
            }
            <br />
        </li>
    ));
    
    // Render artist links
    return isLoading ? (<h1>Loading....</h1>) : 
    (  
        <div className="d-flex flex-column">
            <p style={{marginBottom: 0}}>
                <u>{title} Band Media Links:</u>
            </p>
            <ul>
                { links }
            </ul>
        </div>
    )
}

export default ArtistLinks;