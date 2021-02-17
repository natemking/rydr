import React from 'react';

const ArtistLinks = ({artist, isLoading}) => {
    if (!artist.bandLinks){
        artist.bandLinks = ["","","","",""]
    }
    return isLoading ? (<h1>Loading....</h1>) : 
    (
        <div className="d-flex flex-column">
            <a href={artist.bandLinks[0].siteUrl}>{artist.bandLinks[0].siteName}</a>
            <a href={artist.bandLinks[1].siteUrl}>{artist.bandLinks[1].siteName}</a>
            <a href={artist.bandLinks[2].siteUrl}>{artist.bandLinks[2].siteName}</a>
            <a href={artist.bandLinks[3].siteUrl}>{artist.bandLinks[3].siteName}</a>
            <a href={artist.bandLinks[4].siteUrl}>{artist.bandLinks[4].siteName}</a>

        </div>
 
    )
}

export default ArtistLinks;