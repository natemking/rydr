import React from 'react';

const Artist = ({artist, isLoading}) => {
    return isLoading ? (<h1>Loading....</h1>) : (
        <div className="d-flex flex-row flex-wrap align-items-center">
        <img alt="bandphoto" className="img-fluid bandphoto" src={artist.bandImg}></img>
        <div className="d-flex flex-column p-2 flex-wrap">
            <h1>{artist.bandName}</h1>
            <h2>{artist.location}</h2>
            <h3>Description:</h3>
            <div className="d-flex bandbio">
            <p>{artist.bandBio}</p>
            </div>
            <a href={"mailto:" + artist.contact}>{artist.contact}</a>
            {/* <a href="#">{artist.bandLinks}</a> */}
            {/* <a href={artistLinks[0].siteUrl}>{artistLinks[0].siteName}</a>
            <a href={artistLinks[1].siteUrl}>{artistLinks[1].siteName}</a>
            <a href={artistLinks[2].siteUrl}>{artistLinks[2].siteName}</a> */} 
        </div>
        </div>
    )
}

export default Artist;