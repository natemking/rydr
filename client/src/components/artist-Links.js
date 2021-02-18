import React from 'react';

const ArtistLinks = ({ artist, isLoading }) => {
  
    // Iterate over band links for display
    const links = artist.bandLinks.map((link) => (
        <>
            <a href={`https://${link.siteUrl}`} target='_blank' rel='noreferrer'>
                {link.siteName}
            </a>
            <br />
        </>
    ))

    // Render artist links
    return isLoading ? (<h1>Loading....</h1>) : 
    (  
            <div className="d-flex flex-column">
                <p>
                    <u>Band Media Links:</u>
                    <br />
                    { links }
                </p>
            </div>
    )
}

export default ArtistLinks;