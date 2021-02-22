import React, {useContext} from 'react';
import ArtistLinks from './artist-Links'
import { Link } from 'react-router-dom';

const Artist = ({artist, isLoading, id}) => {
    const userId = localStorage.getItem("id");
    const updateBandUrl = `/updateartist/${id}`;
    console.log(window.location.href)
    const url = window.location.href;
    const bandId = url.substring(url.lastIndexOf('/') +1);
    console.log("bandId:", bandId, "passed id from state:", id, "url path:", url, "userId from local:", userId );
    // If band photo exists render it
    const renderImg = () => {
      if (artist.bandImg) { return ( <img alt="bandphoto" className="img-fluid bandphoto" src={ artist.bandImg } /> ) }
    }

    // If band links exist render them
    const renderBandLinks = () => {
      if (artist.bandLinks.length > 0) { return (<ArtistLinks artist={ artist } isLoading={isLoading} />) }
    }

    // Render artist info
    return isLoading ? (<h1>Loading....</h1>) : (
        <div className="d-flex flex-row flex-wrap align-items-center">
    
            { renderImg() }
            
            <div className="d-flex flex-column p-2 flex-wrap">
                <h1>
                    {artist.bandName}
                </h1>
                <h2>
                    {artist.location}
                </h2>
                <h3>
                    <u>Bio:</u>
                </h3>

                <div className="d-flex bandbio">
                    <p>{artist.bandBio}</p>
                </div>

                <p>
                    <u>Contact Info:</u>
                    <br />
                    <a href={"mailto:" + artist.contact}>
                        { artist.contact }
                    </a>
                </p>

                { renderBandLinks() }
                {userId !== bandId ? null :
                <Link to={updateBandUrl}>
                    <button className="artistUpdateButton">Update Band Info</button>
                </Link>}
            </div>

        </div>
    )
}

export default Artist;