import React from 'react';
import ArtistLinks from './artist-Links'
import { Link } from 'react-router-dom';

const Artist = ({artist, isLoading}) => {
    console.log(artist);
    
    const renderImg = () => {
      if (artist.bandImg) {
          return (
              <img alt="bandphoto" className="img-fluid bandphoto" src={ artist.bandImg } />
          )
      }
    }

    const renderBandLinks = () => {
      if (artist.bandLinks.length > 0) {
          <ArtistLinks artist={ artist } isLoading={isLoading} />
      }
    }

    return isLoading ? (<h1>Loading....</h1>) : (
        <div className="d-flex flex-row flex-wrap align-items-center">
        {/* <img alt="bandphoto" className="img-fluid bandphoto" src={artist.bandImg ?artist.bandImg : "#"}></img> */}
        { renderImg }
        <div className="d-flex flex-column p-2 flex-wrap">
            <h1>{artist.bandName}</h1>
            <h2>{artist.location}</h2>
            <h3>Bio:</h3>
            <div className="d-flex bandbio">
                <p>{artist.bandBio}</p>
            </div>
            <a href={"mailto:" + artist.contact}>{ artist.contact }</a>
            {/* <ArtistLinks artist={ artist } isLoading={isLoading}/> */}
            { renderBandLinks }
            <Link to='/updateartist'>
                <button>Update Band Info</button>
            </Link>
        </div>
        </div>
    )
}

export default Artist;