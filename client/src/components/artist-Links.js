import React from 'react';
import API from '../utils/API'


const ArtistLinks = ({ artist, isLoading, title }) => {
    // Variable for the different types of links to display
    let links;
    
    // On click remove user link from DB and DOM
    const handleOnClick = (e) => {
        API.deleteLink({bandId:artist._id, id:e.target.id});
        document.getElementById(e.target.id).parentNode.parentNode.remove();
    }

    // Iterate over band links for display. Type of the list element is different depending on the page it is being rendered in
    if (title) {
        // Links for Update Artist screen
        links = artist.bandLinks.map((link) => (
            <li key={ link._id } className='artistLink__li'>
                { link.siteName }
                <span>
                    <i className="fa fa-times" aria-hidden="true" id={ link._id } onClick={ handleOnClick }></i>
                </span>
                <br />
            </li>
        ));
    } else {
        // Links for Band Profile screen
        links = artist.bandLinks.map((link) => (
            <li key={link._id}>
                <a href={`https://${link.siteUrl}`} target='_blank' rel='noreferrer'>
                    {link.siteName}
                </a>
                <br />
            </li>
        ));
    }

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