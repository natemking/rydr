import React from 'react';
import ArtistLinks from './artist-Links'
import { Link } from 'react-router-dom';
import UpdateArtist from './artist-Update';

const Artist = ({artist, isLoading}) => {
    
    const handleBtnClick = (e) => {
        e.prevent
    }


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
            <ArtistLinks artist={artist} isLoading={isLoading}/>
            <button>Update Band Info</button>
            <UpdateArtist artist={artist} />
        </div>
        </div>
    )
}

export default Artist;