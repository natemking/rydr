import React from 'react';
import API from '../utils/API'


const ArtistLinks = ({ artist, isLoading, title }) => {

    let links;
    
    const handleOnClick = (e) => {
        console.log(artist._id, e.target.id)
      API.deleteLink({bandId:artist._id, id:e.target.id});
    }

    // Iterate over band links for display
    if (title) {
        links = artist.bandLinks.map((link) => (
            <>
                <li key={ link._id } className='artistLink__li'>
                    { link.siteName }
                    <span>
                        <i className="fa fa-times" aria-hidden="true" id={ link._id } onClick={ handleOnClick }></i>
                    </span>
                    <br />
                </li>
            </>
            
        ));
    } else {
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